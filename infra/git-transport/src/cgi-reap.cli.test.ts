import { afterAll, afterEach, describe, expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { chmodSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { handleCgi } from "./cgi"

const PS_MAX_BUFFER = 64 * 1024 * 1024

function survivingProcs(marker: string): { live: number; total: number } {
  const out = execFileSync("ps", ["-eo", "stat=,args="], {
    encoding: "utf8",
    maxBuffer: PS_MAX_BUFFER,
  })
  let live = 0
  let total = 0
  for (const raw of out.split("\n")) {
    const line = raw.trim()
    if (line === "" || !line.includes(marker)) continue
    total++
    if (!(line.split(/\s+/)[0] ?? "").startsWith("Z")) live++
  }
  return { live, total }
}

async function settledSurvivors(
  marker: string,
  timeoutMs = 4000
): Promise<{ live: number; total: number }> {
  const start = Date.now()
  let s = survivingProcs(marker)
  while ((s.live > 0 || s.total > 0) && Date.now() - start < timeoutMs) {
    await Bun.sleep(50)
    s = survivingProcs(marker)
  }
  return s
}

let stubCounter = 0
const cleanupMarkers: string[] = []
const made: string[] = []

function writeStub(body: string): { path: string; dir: string } {
  const dir = mkdtempSync(join(tmpdir(), "cgi-reap-"))
  made.push(dir)
  const path = join(dir, `stub-${++stubCounter}.sh`)
  writeFileSync(path, body)
  chmodSync(path, 0o755)
  cleanupMarkers.push(dir)
  return { path, dir }
}

afterEach(() => {
  delete process.env.GIT_HTTP_BACKEND_BIN
  for (const marker of cleanupMarkers.splice(0)) {
    try {
      execFileSync("pkill", ["-9", "-f", marker])
    } catch {}
  }
})

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

describe("handleCgi git-http-backend reap", () => {
  test("kills and reaps the backend process group when the client disconnects mid-response", async () => {
    const sleepArg = `120.${stubCounter + 1}`
    const childMarker = `sleep ${sleepArg}`
    const { path, dir } = writeStub(
      "#!/bin/sh\n" +
        "printf 'Status: 200\\r\\nContent-Type: application/x-git-upload-pack-result\\r\\n\\r\\nFIRST_CHUNK'\n" +
        `sleep ${sleepArg}\n`
    )
    cleanupMarkers.push(childMarker)
    process.env.GIT_HTTP_BACKEND_BIN = path

    const res = await handleCgi(
      new Request("http://git/info/refs?service=git-upload-pack"),
      "/info/refs",
      "service=git-upload-pack",
      "tester"
    )
    expect(res.body).not.toBeNull()
    const reader = res.body?.getReader()
    if (reader === undefined) throw new Error("response body missing")
    const first = await reader.read()
    expect(new TextDecoder().decode(first.value)).toContain("FIRST_CHUNK")

    await reader.cancel()

    const leader = await settledSurvivors(dir)
    expect(leader.live).toBe(0)
    expect(leader.total).toBe(0)
    const child = await settledSurvivors(childMarker)
    expect(child.live).toBe(0)
    expect(child.total).toBe(0)
  }, 15000)

  test("reaps the backend with no zombie on normal completion", async () => {
    const { path, dir } = writeStub(
      "#!/bin/sh\n" +
        "cat >/dev/null\n" +
        "printf 'Status: 200\\r\\nContent-Type: text/plain\\r\\n\\r\\nNORMAL_OK'\n"
    )
    process.env.GIT_HTTP_BACKEND_BIN = path

    const res = await handleCgi(
      new Request("http://git/git-upload-pack", { method: "POST", body: "0000" }),
      "/git-upload-pack",
      "",
      "tester"
    )
    expect(res.status).toBe(200)
    expect(await res.text()).toContain("NORMAL_OK")

    const survivors = await settledSurvivors(dir)
    expect(survivors.live).toBe(0)
    expect(survivors.total).toBe(0)
  }, 15000)

  test("reaps the backend when it exits before draining the request body (broken pipe)", async () => {
    const { path, dir } = writeStub(
      "#!/bin/sh\n" + "printf 'Status: 200\\r\\nContent-Type: text/plain\\r\\n\\r\\nBP_OK'\n"
    )
    process.env.GIT_HTTP_BACKEND_BIN = path

    const res = await handleCgi(
      new Request("http://git/git-upload-pack", {
        method: "POST",
        body: "x".repeat(512 * 1024),
      }),
      "/git-upload-pack",
      "",
      "tester"
    )
    await res.text()

    const survivors = await settledSurvivors(dir)
    expect(survivors.live).toBe(0)
    expect(survivors.total).toBe(0)
  }, 15000)
})

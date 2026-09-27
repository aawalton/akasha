import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { stubFor } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-bundling/service-bundling.module.code.ts"
import {
  THREAD_HEADER,
  threadsFor,
} from "akasha/page/service/modules/page-threading/page-threading.module.code.ts"

const ROOT = rootOf(import.meta.dir)

const RUNNING = join(ROOT, "page/service/page-service.service-workstation.running.code.ts")

const ARCH = "npm_config_arch"

const ASKED = { pageTypeSlug: "decision-kind", keys: ["slug"] }

const scratch = scratchWorld()

async function bundled(): Promise<string> {
  const at = scratch.rootFor("akasha-page-threading-")
  const stub = join(at, "entry.ts")
  await Bun.write(stub, stubFor(RUNNING))
  const built = await Bun.build({
    entrypoints: [stub],
    target: "bun",
    sourcemap: "inline",
    external: ["chromium-bidi"],
  })
  const first = built.outputs[0]
  if (!built.success || first === undefined) throw new Error(built.logs.map(String).join("; "))
  const bundle = join(at, "bundle.js")
  await Bun.write(bundle, await first.text())
  return bundle
}

function asked(path: string, method = "POST", body: unknown = ASKED): Request {
  const at = `http://threads.invalid${path}`
  return method === "GET"
    ? new Request(at)
    : new Request(at, { method, body: JSON.stringify(body) })
}

const entry = await bundled()

const was = process.env[ARCH]

process.env[ARCH] = "unresolvable"

const threads = threadsFor(ROOT, { entry, readers: 2, kept: () => undefined })

if (was === undefined) delete process.env[ARCH]
else process.env[ARCH] = was

afterAll(async () => {
  await threads.stopped()
  scratch.sweep()
})

async function answeredOn(
  sent: Promise<Response> | null
): Promise<{ readonly thread: string | null; readonly status: number; readonly body: unknown }> {
  if (sent === null) throw new Error("a read was left to the thread that listens")
  const response = await sent
  return {
    thread: response.headers.get(THREAD_HEADER),
    status: response.status,
    body: await response.json(),
  }
}

test("a write, a follow, a stream and a read by GET are left to the thread that listens", () => {
  for (const one of ["/write", "/append", "/place", "/increment", "/follow"]) {
    expect(threads.answered(asked(one))).toBeNull()
  }
  expect(threads.answered(asked("/events", "GET"))).toBeNull()
  expect(threads.answered(asked("/ask", "GET"))).toBeNull()
})

test("questions asked of threads started from the built bundle are answered on every thread", async () => {
  const answered = await Promise.all(
    Array.from({ length: 6 }, () => answeredOn(threads.answered(asked("/ask"))))
  )
  expect(answered.map((one) => one.status)).toEqual([200, 200, 200, 200, 200, 200])
  for (const one of answered) {
    const rows = (one.body as { rows: readonly { slug: string }[] }).rows
    expect(rows.map((row) => row.slug)).toContain("departure")
  }
  expect(new Set(answered.map((one) => one.thread))).toEqual(new Set(["0", "1"]))
})

test("a shape and a read are answered on a thread", async () => {
  const shaped = await answeredOn(
    threads.answered(asked("/shape", "POST", { pageTypeSlug: "module" }))
  )
  expect(shaped.status).toBe(200)
  const paths = ["page/service/page-service.service-workstation.ts"]
  const read = await answeredOn(threads.answered(asked("/read", "POST", { paths })))
  expect(read.status).toBe(200)
  expect(read.thread).not.toBeNull()
})

test("each thread tells its heap", () => {
  expect(threads.heapsSaid()).toMatch(/^thread heaps \d+, \d+ MB$/)
})

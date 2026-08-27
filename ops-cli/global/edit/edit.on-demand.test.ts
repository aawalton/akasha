import { describe, expect, test } from "bun:test"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

const HERE = resolve(import.meta.dir, "../..")

const INSTRUCTIONS = process.env.INSTRUCTIONS_ROOT ?? resolve(HERE, "..", "instructions")

const SUBJECT = "patches/edit-pairs.ts"

const ANCHOR = "export interface Pair {"

interface Ran {
  readonly code: number
  readonly said: string
}

function editing(next: string): Ran {
  const dir = mkdtempSync("/var/tmp/akasha-edit-")
  try {
    const payload = `${dir}/payload.json`
    writeFileSync(
      payload,
      JSON.stringify([{ file_path: `${HERE}/${SUBJECT}`, old_string: ANCHOR, new_string: next }])
    )
    const ran = Bun.spawnSync({
      cmd: [
        process.execPath,
        `${INSTRUCTIONS}/tools/ops/cli.ts`,
        "edit",
        "--dry-run",
        "--mechanical",
        "--input-file",
        payload,
      ],
      env: { ...process.env, INSTRUCTIONS_ROOT: INSTRUCTIONS },
      stdout: "pipe",
      stderr: "pipe",
    })
    return {
      code: ran.exitCode ?? -1,
      said: `${ran.stdout.toString()}${ran.stderr.toString()}`,
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

describe("what akasha's checks make of a substitution landing here", () => {
  test("the anchor this states its substitution against is in the file", () => {
    expect(readFileSync(`${HERE}/${SUBJECT}`, "utf8")).toContain(ANCHOR)
  })

  test("a body the type check refuses is refused, and nothing is written", () => {
    const ran = editing(`const broken: number = "text"\n\n${ANCHOR}`)
    expect(ran.said).toContain("typecheck")
    expect(ran.said).toContain("nothing was written")
    expect(ran.code).toBe(1)
  })

  test("`--mechanical` drops the gates judging the writer and none of those judging the text", () => {
    const ran = editing(`const broken: number = "text"\n\n${ANCHOR}`)
    expect(ran.said).not.toContain("read-before-write")
    expect(ran.said).toContain("typecheck")
  })

  test("a body they admit says how many checks weighed it, and lands nothing on a dry run", () => {
    const ran = editing(`// the comment a dry run adds and never lands\n${ANCHOR}`)
    expect(ran.said).toMatch(/gate: \d+ akasha check\(s\) over 1 changed file\(s\), none refused/)
    expect(ran.said).toContain("dry-run")
    expect(ran.code).toBe(0)
    expect(readFileSync(`${HERE}/${SUBJECT}`, "utf8")).not.toContain("the comment a dry run adds")
  })
})

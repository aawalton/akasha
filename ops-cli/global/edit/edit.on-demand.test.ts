import { describe, expect, test } from "bun:test"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { akashaRoot } from "../../../repo/roots/roots.ts"

const HERE = akashaRoot()

const SUBJECT = "patches/edit-pairs.ts"

const ANCHOR = "export interface Pair {"

interface Ran {
  readonly code: number
  readonly said: string
}

function payloadFor(next: string): string {
  return JSON.stringify([{ file_path: `${HERE}/${SUBJECT}`, old_string: ANCHOR, new_string: next }])
}

function ranOf(ran: { exitCode: number | null; stdout: Buffer; stderr: Buffer }): Ran {
  return {
    code: ran.exitCode ?? -1,
    said: `${ran.stdout.toString()}${ran.stderr.toString()}`,
  }
}

function editing(next: string): Ran {
  const dir = mkdtempSync("/var/tmp/akasha-edit-")
  try {
    const payload = `${dir}/payload.json`
    writeFileSync(payload, payloadFor(next))
    const ran = Bun.spawnSync({
      cmd: [
        process.execPath,
        `${HERE}/tools/ops/cli.ts`,
        "edit",
        "--dry-run",
        "--mechanical",
        "--input-file",
        payload,
      ],
      env: { ...process.env, AKASHA_ROOT: HERE },
      stdout: "pipe",
      stderr: "pipe",
    })
    return ranOf(ran)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

function editingOnStdin(next: string, inputFile: readonly string[]): Ran {
  const ran = Bun.spawnSync({
    cmd: [
      process.execPath,
      `${HERE}/tools/ops/cli.ts`,
      "edit",
      "--dry-run",
      "--mechanical",
      ...inputFile,
    ],
    env: { ...process.env, AKASHA_ROOT: HERE },
    stdin: new TextEncoder().encode(payloadFor(next)),
    stdout: "pipe",
    stderr: "pipe",
  })
  return ranOf(ran)
}

const HARMLESS = `// the comment a dry run adds and never lands\n${ANCHOR}`

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

  test("`--mechanical` drops the judgment of the writer and none of those judging the text", () => {
    const ran = editing(`const broken: number = "text"\n\n${ANCHOR}`)
    expect(ran.said).not.toContain("You have not read")
    expect(ran.said).not.toContain("Nothing records what")
    expect(ran.said).toContain("typecheck")
  })

  test("a body they admit says how many checks weighed it, and lands nothing on a dry run", () => {
    const ran = editing(HARMLESS)
    expect(ran.said).toMatch(/gate: \d+ akasha check\(s\) over 1 changed file\(s\), none refused/)
    expect(ran.said).toContain("dry-run")
    expect(ran.code).toBe(0)
    expect(readFileSync(`${HERE}/${SUBJECT}`, "utf8")).not.toContain("the comment a dry run adds")
  })
})

describe("where the payload is read from", () => {
  test("`--input-file -` takes the payload from stdin, which is what the help promises", () => {
    const ran = editingOnStdin(HARMLESS, ["--input-file", "-"])
    expect(ran.said).not.toContain("carries no payload")
    expect(ran.said).toMatch(/gate: \d+ akasha check\(s\) over 1 changed file\(s\), none refused/)
    expect(ran.code).toBe(0)
  })

  test("naming no input file reads stdin too, `-` being the default", () => {
    const ran = editingOnStdin(HARMLESS, [])
    expect(ran.said).not.toContain("carries no payload")
    expect(ran.code).toBe(0)
  })

  test("an input file that is not there says so, rather than reporting an empty payload", () => {
    const ran = editingOnStdin(HARMLESS, ["--input-file", "/var/tmp/akasha-no-such-payload.json"])
    expect(ran.said).toContain("could not be read")
    expect(ran.said).not.toContain("carries no payload")
    expect(ran.code).toBe(1)
  })
})

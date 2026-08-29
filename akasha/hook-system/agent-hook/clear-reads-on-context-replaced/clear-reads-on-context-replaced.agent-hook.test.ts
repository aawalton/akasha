import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { READS_AT } from "../../../command-system/reading/reading.module.code.ts"
import { rootOf } from "../../../command-system/rooting/rooting.module.code.ts"
import {
  agentIn,
  cleared,
  NAMED,
  recordAt,
  replacing,
  SCOPE,
  sourceIn,
} from "./clear-reads-on-context-replaced.agent-hook.code.ts"

const SCRATCH_AT = "/var/tmp"

const SCRIPT = join(import.meta.dir, "clear-reads-on-context-replaced.agent-hook.code.ts")

const ONE = "01a04fa8-2878-7001-8000-000000000001"

const TWO = "01a04fa8-2878-7002-8000-000000000002"

const NOBODY = "01a04fa8-2878-7003-8000-000000000003"

const HERE = rootOf(import.meta.path)

const REPLACING: readonly string[] = ["startup", "clear", "compact"]

const STANDING: readonly string[] = ["resume", "", "other", "Startup", "compaction", "session"]

const held: string[] = []

afterAll(() => {
  for (const one of held) rmSync(one, { recursive: true, force: true })
})

function readingAt(root: string, agentId: string): string {
  return join(recordAt(root, agentId), "path", "akasha", "a.ts.jsonl")
}

function rooted(): string {
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-clearing-"))
  held.push(root)
  for (const one of [ONE, TWO]) {
    const at = readingAt(root, one)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, `{"path":"akasha/a.ts","oid":"${one}","seenAt":1}\n`)
  }
  return root
}

function bare(): string {
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-clearing-"))
  held.push(root)
  return root
}

function planted(agentId: string): string {
  const at = readingAt(HERE, agentId)
  held.push(recordAt(HERE, agentId))
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, `{"path":"akasha/a.ts","oid":"${agentId}","seenAt":1}\n`)
  return at
}

function payloadOf(source: string): string {
  return JSON.stringify({ hook_event_name: "SessionStart", source })
}

function ranWith(
  source: string,
  named: string | null
): { readonly code: number; readonly out: string } {
  const held: Record<string, string> = { ...process.env } as Record<string, string>
  if (named === null) delete held[NAMED]
  else held[NAMED] = named
  const ran = Bun.spawnSync(["bun", SCRIPT], { stdin: Buffer.from(payloadOf(source)), env: held })
  return { code: ran.exitCode, out: ran.stdout.toString() }
}

test("the folder taken away is the one the reading module names", () => {
  expect(recordAt("/r", ONE)).toBe(join("/r", READS_AT, "agent", "id", ONE))
})

test("a startup, a clearing and a compaction each replace the context", () => {
  for (const one of REPLACING) expect(replacing(one)).toBe(true)
})

test("a resumed session, and a source this does not name, replace nothing", () => {
  for (const one of STANDING) expect(replacing(one)).toBe(false)
})

test("a context replaced takes the record with it", () => {
  for (const one of REPLACING) {
    const root = rooted()
    expect(cleared(root, ONE, one)).toBe(true)
    expect(existsSync(recordAt(root, ONE))).toBe(false)
  }
})

test("a resumed session keeps its readings", () => {
  const root = rooted()
  expect(cleared(root, ONE, "resume")).toBe(false)
  expect(existsSync(readingAt(root, ONE))).toBe(true)
})

test("a source this does not recognise leaves the record standing", () => {
  for (const one of STANDING) {
    const root = rooted()
    expect(cleared(root, ONE, one)).toBe(false)
    expect(existsSync(readingAt(root, ONE))).toBe(true)
  }
})

test("one agent's readings are cleared, never another's", () => {
  for (const one of REPLACING) {
    const root = rooted()
    cleared(root, ONE, one)
    expect(existsSync(recordAt(root, ONE))).toBe(false)
    expect(readFileSync(readingAt(root, TWO), "utf8")).toContain(TWO)
  }
})

test("another agent's readings stand through a source that clears nothing", () => {
  const root = rooted()
  cleared(root, ONE, "resume")
  expect(existsSync(readingAt(root, TWO))).toBe(true)
})

test("with no agent named, nothing is cleared", () => {
  for (const one of REPLACING) {
    const root = rooted()
    expect(cleared(root, null, one)).toBe(false)
    expect(cleared(root, "", one)).toBe(false)
    expect(existsSync(readingAt(root, ONE))).toBe(true)
    expect(existsSync(readingAt(root, TWO))).toBe(true)
  }
})

test("a record that is not there is no error, and nothing is put in its place", () => {
  const root = bare()
  expect(cleared(root, ONE, "startup")).toBe(true)
  expect(existsSync(join(root, READS_AT))).toBe(false)
})

test("a record that cannot be reached is left as it stands", () => {
  const root = bare()
  const standing = join(root, READS_AT, "agent", "id")
  mkdirSync(join(standing, ".."), { recursive: true })
  writeFileSync(standing, "not a folder\n")
  expect(cleared(root, ONE, "startup")).toBe(false)
  expect(readFileSync(standing, "utf8")).toBe("not a folder\n")
})

test("the agent is the one AGENT_ID names, and an empty name names none", () => {
  expect(agentIn({ AGENT_ID: ONE })).toBe(ONE)
  expect(agentIn({ AGENT_ID: "" })).toBeNull()
  expect(agentIn({})).toBeNull()
})

test("the source is read from the payload the harness sends", () => {
  for (const one of [...REPLACING, "resume"]) expect(sourceIn(payloadOf(one))).toBe(one)
})

test("a payload that says no source, or will not parse, names none", () => {
  expect(sourceIn("{}")).toBe("")
  expect(sourceIn(JSON.stringify({ source: 1 }))).toBe("")
  expect(sourceIn("{")).toBe("")
  expect(sourceIn("")).toBe("")
})

test("the scope says what this reaches and what it does not", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("refuses nothing")
  expect(said).toContain("NOT REACHED")
  expect(said).toContain("is NOT a finding")
  expect(said).toContain("acts rather than judges")
})

test("the session begins at every source, and the hook says nothing", () => {
  for (const one of [...REPLACING, "resume", "other"]) {
    const ran = ranWith(one, NOBODY)
    expect(ran.code).toBe(0)
    expect(ran.out).toBe("")
  }
})

test("the hook run as the harness runs it clears the record under the root it stands in", () => {
  const standing = planted(ONE)
  expect(ranWith("startup", ONE).code).toBe(0)
  expect(existsSync(standing)).toBe(false)
  expect(existsSync(recordAt(HERE, ONE))).toBe(false)
})

test("the hook run as the harness runs it leaves a resumed session's record standing", () => {
  const standing = planted(TWO)
  expect(ranWith("resume", TWO).code).toBe(0)
  expect(readFileSync(standing, "utf8")).toContain(TWO)
})

test("the session begins with no agent named, and on a payload that will not parse", () => {
  expect(ranWith("startup", null).code).toBe(0)
  const ran = Bun.spawnSync(["bun", SCRIPT], { stdin: Buffer.from("{") })
  expect(ran.exitCode).toBe(0)
  expect(ran.stdout.toString()).toBe("")
})

test("the hook prints its scope when it is asked", () => {
  const ran = Bun.spawnSync(["bun", SCRIPT, "--scope"], { stdin: Buffer.from("") })
  expect(ran.exitCode).toBe(0)
  expect(ran.stdout.toString()).toContain("NOT REACHED")
})

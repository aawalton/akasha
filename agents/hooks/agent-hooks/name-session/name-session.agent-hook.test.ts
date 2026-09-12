import { expect, test } from "bun:test"
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  nameInTail,
  namingFor,
  namingLines,
  namingOver,
  SCOPE,
  written,
} from "akasha/agents/hooks/agent-hooks/name-session/name-session.agent-hook.code.ts"
import { ASIDE } from "akasha/agents/hooks/answer/hook-answer.module.code.ts"
import { SEAT_NAMED } from "akasha/agents/read-record/read-record.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

const SCRIPT = join(import.meta.dir, "name-session.agent-hook.code.ts")

const SCRATCH_AT = "/var/tmp"

const SEAT = "01a09119-482d-7000-0000-000000000001"

const NAME = "amy"

const SESSION = "6cf559a1-ac60-479c-9cb1-2ad8d35d8b14"

const AT = "/var/tmp/akasha-name-session-none/one.jsonl"

const SEATED: Readonly<Record<string, string>> = { [SEAT_NAMED]: SEAT }

const FIRST = JSON.stringify({ type: "user", sessionId: SESSION })

function payloadOf(said: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    hook_event_name: "Stop",
    session_id: SESSION,
    transcript_path: AT,
    ...said,
  }
}

function named(): string | null {
  return NAME
}

function nothing(): string | null {
  return null
}

function ranWith(
  raw: string,
  seat: string | null
): { readonly code: number; readonly out: string; readonly err: string } {
  const env: Record<string, string> = {
    PATH: process.env["PATH"] ?? "",
    HOME: process.env["HOME"] ?? "",
  }
  if (seat !== null) env[SEAT_NAMED] = seat
  return ran(["bun", SCRIPT], { stdin: Buffer.from(raw), env })
}

test("a name is written in the two shapes the harness itself writes", () => {
  const lines = namingLines(NAME, SESSION).split("\n")
  expect(JSON.parse(lines[0] ?? "")).toEqual({
    type: "agent-name",
    agentName: NAME,
    sessionId: SESSION,
  })
  expect(JSON.parse(lines[1] ?? "")).toEqual({
    type: "custom-title",
    customTitle: NAME,
    sessionId: SESSION,
  })
  expect(lines[2]).toBe("")
})

test("the name a transcript carries is the last one written for that session", () => {
  const tail = `${namingLines("one", SESSION)}${namingLines("two", SESSION)}`
  expect(nameInTail(tail, SESSION)).toBe("two")
})

test("a name written for another session is not this session's name", () => {
  expect(nameInTail(namingLines("one", "other"), SESSION)).toBeNull()
})

test("a line of a transcript that will not read is passed over", () => {
  const tail = ["{ not json", "", "plain words", namingLines(NAME, SESSION)].join("\n")
  expect(nameInTail(tail, SESSION)).toBe(NAME)
})

test("a transcript carrying no name at all names nobody", () => {
  expect(nameInTail("", SESSION)).toBeNull()
  expect(nameInTail(`${FIRST}\n`, SESSION)).toBeNull()
})

test("a transcript already carrying the seat's name is written nothing", () => {
  expect(namingOver(payloadOf(), NAME, () => namingLines(NAME, SESSION))).toBeNull()
})

test("a transcript carrying another name is named again", () => {
  const said = namingOver(payloadOf(), NAME, () => namingLines("other", SESSION))
  expect(said).toEqual({ at: AT, lines: namingLines(NAME, SESSION) })
})

test("a transcript nothing could be read from is named", () => {
  expect(namingOver(payloadOf(), NAME, nothing)).toEqual({
    at: AT,
    lines: namingLines(NAME, SESSION),
  })
})

test("a payload naming no transcript or no session names nothing", () => {
  const every: readonly Record<string, unknown>[] = [
    { transcript_path: "" },
    { transcript_path: 3 },
    { transcript_path: null },
    { session_id: "" },
    { session_id: null },
  ]
  for (const one of every) expect(namingOver(payloadOf(one), NAME, nothing)).toBeNull()
})

test("the seat's own name is what a session is named", () => {
  expect(namingFor(SEATED, JSON.stringify(payloadOf()), named, nothing)).toEqual({
    at: AT,
    lines: namingLines(NAME, SESSION),
  })
})

test("a stop under no seat names nothing", () => {
  const raw = JSON.stringify(payloadOf())
  expect(namingFor({}, raw, named, nothing)).toBeNull()
  expect(namingFor({ [SEAT_NAMED]: "" }, raw, named, nothing)).toBeNull()
})

test("a seat akasha holds no page for names nobody", () => {
  const raw = JSON.stringify(payloadOf())
  expect(namingFor(SEATED, raw, nothing, nothing)).toBeNull()
  expect(namingFor(SEATED, raw, () => "", nothing)).toBeNull()
})

test("a payload that will not read names nothing", () => {
  for (const one of ["", "{ not json", "[]", "null", '"one"', "3"]) {
    expect(namingFor(SEATED, one, named, nothing)).toBeNull()
  }
})

test("the lines are appended to the transcript the payload names", () => {
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-name-session-"))
  const at = join(root, "one.jsonl")
  writeFileSync(at, `${FIRST}\n`)
  written({ at, lines: namingLines(NAME, SESSION) })
  const raw = readFileSync(at, "utf8")
  expect(raw.startsWith(`${FIRST}\n`)).toBe(true)
  expect(nameInTail(raw, SESSION)).toBe(NAME)
})

test("a transcript named twice keeps the name it was named last", () => {
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-name-session-twice-"))
  const at = join(root, "one.jsonl")
  writeFileSync(at, `${FIRST}\n`)
  written({ at, lines: namingLines("one", SESSION) })
  written({ at, lines: namingLines(NAME, SESSION) })
  expect(nameInTail(readFileSync(at, "utf8"), SESSION)).toBe(NAME)
})

test("the scope says what this reaches and what it does not", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("refuses nothing")
  expect(said).toContain("NOT REACHED")
  expect(said).toContain("is NOT a finding")
  expect(said).toContain("writes a name rather than judging a stop")
})

test("the hook run as the harness runs it says nothing of a stop it names nobody for", () => {
  const every: readonly { readonly raw: string; readonly seat: string | null }[] = [
    { raw: JSON.stringify(payloadOf()), seat: null },
    { raw: JSON.stringify(payloadOf()), seat: SEAT },
    { raw: "{ not json", seat: SEAT },
    { raw: "", seat: SEAT },
  ]
  for (const one of every) {
    const said = ranWith(one.raw, one.seat)
    expect(said.code).toBe(ASIDE)
    expect(said.out).toBe("")
    expect(said.err).toBe("")
  }
})

test("the hook prints its scope when it is asked", () => {
  const done = ran(["bun", SCRIPT, "--scope"], { stdin: Buffer.from("") })
  expect(done.code).toBe(ASIDE)
  expect(done.out).toContain("NOT REACHED")
})

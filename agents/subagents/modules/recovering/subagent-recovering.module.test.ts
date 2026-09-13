import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { readsBesideAt } from "akasha/agents/modules/read-record/read-record.module.code.ts"
import {
  refusalsAt,
  refusalsKept,
} from "akasha/agents/modules/refusals-keeping/refusals-keeping.module.code.ts"
import {
  CARRIED_AT,
  carriedOff,
  editsSaid,
  LEFT_BY,
  movedOnto,
  namedAt,
  READ_BY,
  readsSaid,
  refusalsSaid,
  seatEditsAt,
  seatReadsAt,
  seatRefusalsAt,
} from "akasha/agents/subagents/modules/recovering/subagent-recovering.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  appendEdits,
  linesIn,
} from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { scratch } from "akasha/pages/indexes/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const SEAT = "agents/seats/pages/tester/tester.seat.ts"

const UNDER = "agents/subagents/pages/tester-abc/tester-abc.subagent.ts"

const ROW: FileChange = { kind: "remove", path: "one.md" }

const OTHER: FileChange = { kind: "remove", path: "two.md" }

const AGENT_ID = "01a09573-2604-7000-98dd-c04bec8e0696--abc"

const READING = JSON.stringify({ path: "one.md", oid: "aaa", seenAt: 1, carriedOid: null })

const READING_TOO = JSON.stringify({ path: "two.md", oid: "bbb", seenAt: 2, carriedOid: null })

function bodyAt(root: string, at: string | null): string {
  if (at === null) return ""
  try {
    return readFileSync(join(root, at), "utf8")
  } catch {
    return ""
  }
}

function folderFor(root: string, page: string): undefined {
  mkdirSync(dirname(join(root, page)), { recursive: true })
  return undefined
}

function keptIn(root: string): readonly Record<string, string>[] {
  return bodyAt(root, seatEditsAt(SEAT))
    .split("\n")
    .filter((one) => one !== "")
    .map((one) => JSON.parse(one) as Record<string, string>)
}

function readingsKept(root: string): readonly Record<string, string>[] {
  return bodyAt(root, seatReadsAt(SEAT))
    .split("\n")
    .filter((one) => one !== "")
    .map((one) => JSON.parse(one) as Record<string, string>)
}

function subagentPaged(root: string, page: string, agentId: string | null): undefined {
  folderFor(root, page)
  const said = agentId === null ? "" : `, agentId: "${agentId}"`
  writeFileSync(join(root, page), `export const page = { type: "subagent"${said} }\n`)
  return undefined
}

function readingsPut(root: string, page: string, lines: readonly string[]): undefined {
  const at = readsBesideAt(page)
  if (at === null) return undefined
  folderFor(root, page)
  writeFileSync(join(root, at), lines.map((one) => `${one}\n`).join(""))
  return undefined
}

test("the edits a subagent never landed are appended to the seat", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW, OTHER])

  expect(movedOnto(root, SEAT, UNDER)).toEqual({ edits: 2, refusals: false })
  expect(keptIn(root).map((one) => one.path)).toEqual(["one.md", "two.md"])
})

test("a line appended says which subagent left it and when the seat took it", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW])
  movedOnto(root, SEAT, UNDER)

  const [one] = keptIn(root)
  expect(one?.[LEFT_BY]).toBe("tester-abc")
  const at = one?.[CARRIED_AT] ?? ""
  expect(new Date(at).toISOString()).toBe(at)
})

test("every line one move appends says the same time", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW, OTHER])
  movedOnto(root, SEAT, UNDER)

  const held = keptIn(root)
  expect(held.length).toBe(2)
  expect(held[0]?.[CARRIED_AT]).toBe(held[1]?.[CARRIED_AT] ?? "")
})

test("a line that reads as no object is appended unchanged", () => {
  expect(editsSaid(["not an object"], "tester-abc", "2026-09-13T00:00:00.000Z")).toBe(
    "not an object\n"
  )
})

test("a second subagent's edits follow the first rather than replacing them", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW])
  movedOnto(root, SEAT, UNDER)
  const second = "agents/subagents/pages/tester-def/tester-def.subagent.ts"
  appendEdits(root, second, [OTHER])
  movedOnto(root, SEAT, second)

  expect(keptIn(root).map((one) => one.path)).toEqual(["one.md", "two.md"])
  expect(keptIn(root).map((one) => one[LEFT_BY])).toEqual(["tester-abc", "tester-def"])
})

test("what was moved is taken from beside the subagent rather than copied", () => {
  const root = scratch.rootFor("subagent-recovering-")
  folderFor(root, UNDER)
  appendEdits(root, UNDER, [ROW])
  refusalsKept(root, UNDER, ["why"])
  movedOnto(root, SEAT, UNDER)

  expect(linesIn(root, UNDER)).toEqual([])
  expect(bodyAt(root, refusalsAt(UNDER))).toBe("")
})

test("a second move over the same subagent moves nothing", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW])
  movedOnto(root, SEAT, UNDER)

  expect(movedOnto(root, SEAT, UNDER)).toEqual({ edits: 0, refusals: false })
  expect(keptIn(root).map((one) => one.path)).toEqual(["one.md"])
})

test("a subagent with nothing beside it moves nothing", () => {
  const root = scratch.rootFor("subagent-recovering-")

  expect(movedOnto(root, SEAT, UNDER)).toEqual({ edits: 0, refusals: false })
  expect(bodyAt(root, seatEditsAt(SEAT))).toBe("")
})

test("what the last landing a subagent tried refused is appended to the seat", () => {
  const root = scratch.rootFor("subagent-recovering-")
  folderFor(root, UNDER)
  refusalsKept(root, UNDER, ["the body moved under the change"])

  expect(movedOnto(root, SEAT, UNDER)).toEqual({ edits: 0, refusals: true })
  expect(bodyAt(root, seatRefusalsAt(SEAT))).toBe(
    refusalsSaid("tester-abc", "the body moved under the change")
  )
})

test("a refusal appended is opened by the slug of the subagent whose refusal it was", () => {
  expect(refusalsSaid("tester-abc", "why")).toBe("tester-abc\n\nwhy\n\n")
})

test("a subagent's slug is read off its page rather than handed in", () => {
  expect(namedAt(UNDER)).toBe("tester-abc")
})

test("the seat keeps each kind beside its own page under the name its property states", () => {
  expect(seatEditsAt(SEAT)).toBe(
    "agents/seats/pages/tester/tester.seat.subagent-edits.uncommitted.jsonl"
  )
  expect(seatRefusalsAt(SEAT)).toBe(
    "agents/seats/pages/tester/tester.seat.subagent-refusals.uncommitted.txt"
  )
})

test("a page taken away that is no subagent moves nothing", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW])

  expect(carriedOff(root, UNDER, { type: "module", slug: "tester-abc" })).toBe(null)
  expect(linesIn(root, UNDER)).toEqual([JSON.stringify(ROW)])
})

test("a subagent page naming no seat moves nothing", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW])

  expect(carriedOff(root, UNDER, { type: "subagent", slug: "tester-abc" })).toBe(null)
  expect(linesIn(root, UNDER)).toEqual([JSON.stringify(ROW)])
})

test("a path that is no page keeps nothing", () => {
  expect(seatEditsAt("notes.md")).toBe(null)
  expect(seatRefusalsAt("notes.md")).toBe(null)
  expect(seatReadsAt("notes.md")).toBe(null)
})

test("the readings a subagent made are appended to the seat", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING, READING_TOO])
  movedOnto(root, SEAT, UNDER)

  expect(readingsKept(root).map((one) => one.path)).toEqual(["one.md", "two.md"])
})

test("a reading the seat keeps says the agent id it was made by", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING])
  movedOnto(root, SEAT, UNDER)

  expect(readingsKept(root)[0]?.[READ_BY]).toBe(AGENT_ID)
})

test("the readings moved are taken from beside the subagent", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING])
  movedOnto(root, SEAT, UNDER)

  expect(bodyAt(root, readsBesideAt(UNDER))).toBe("")
  movedOnto(root, SEAT, UNDER)
  expect(readingsKept(root).length).toBe(1)
})

test("a page stating no agent id moves no reading", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, null)
  readingsPut(root, UNDER, [READING])
  movedOnto(root, SEAT, UNDER)

  expect(bodyAt(root, readsBesideAt(UNDER))).toBe(`${READING}\n`)
  expect(bodyAt(root, seatReadsAt(SEAT))).toBe("")
})

test("a reading the seat keeps is beside the seat rather than among the seat's own", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING])
  movedOnto(root, SEAT, UNDER)

  expect(bodyAt(root, readsBesideAt(SEAT))).toBe("")
  expect(seatReadsAt(SEAT)).toBe(
    "agents/seats/pages/tester/tester.seat.subagent-reads.uncommitted.jsonl"
  )
})

test("a reading that reads as no object is appended unchanged", () => {
  expect(readsSaid(["not an object"], AGENT_ID)).toBe("not an object\n")
})

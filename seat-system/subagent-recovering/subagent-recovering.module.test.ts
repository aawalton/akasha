import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { appendEdits } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { refusalsKept } from "akasha/commands/modules/refusals-keeping/refusals-keeping.module.code.ts"
import { scratch } from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"
import {
  movedOnto,
  namedAt,
  refusalsSaid,
  seatEditsAt,
  seatRefusalsAt,
} from "./subagent-recovering.module.code.ts"

afterAll(scratch.sweep)

const SEAT = "seat-system/seats/pages/tester/tester.seat.ts"

const UNDER = "seat-system/subagents/pages/tester-abc/tester-abc.subagent.ts"

const ROW: FileChange = { kind: "remove", path: "one.md" }

const OTHER: FileChange = { kind: "remove", path: "two.md" }

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

test("the edits a subagent never landed are appended to the seat", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW, OTHER])

  expect(movedOnto(root, SEAT, UNDER)).toEqual({ edits: 2, refusals: false })
  expect(
    bodyAt(root, seatEditsAt(SEAT))
      .split("\n")
      .filter((one) => one !== "")
  ).toEqual([JSON.stringify(ROW), JSON.stringify(OTHER)])
})

test("a second subagent's edits follow the first rather than replacing them", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW])
  movedOnto(root, SEAT, UNDER)
  const second = "seat-system/subagents/pages/tester-def/tester-def.subagent.ts"
  appendEdits(root, second, [OTHER])
  movedOnto(root, SEAT, second)

  expect(
    bodyAt(root, seatEditsAt(SEAT))
      .split("\n")
      .filter((one) => one !== "")
  ).toEqual([JSON.stringify(ROW), JSON.stringify(OTHER)])
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
    "seat-system/seats/pages/tester/tester.seat.subagent-edits.uncommitted.jsonl"
  )
  expect(seatRefusalsAt(SEAT)).toBe(
    "seat-system/seats/pages/tester/tester.seat.subagent-refusals.uncommitted.txt"
  )
})

test("a path that is no page keeps nothing", () => {
  expect(seatEditsAt("notes.md")).toBe(null)
  expect(seatRefusalsAt("notes.md")).toBe(null)
})

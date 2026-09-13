import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  movedOnto,
  seatEditsAt,
} from "akasha/agents/subagents/modules/recovering/subagent-recovering.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { appendEdits } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  droppingRecords,
  listingRecords,
  recordsKept,
  showingRecords,
} from "akasha/commands/pages/change/subagent/modules/subagent-edits-acting/subagent-edits-acting.module.code.ts"
import { scratch } from "akasha/pages/indexes/modules/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

const SEAT = "agents/seats/pages/tester/tester.seat.ts"

const UNDER = "seat-system/subagents/pages/tester-abc/tester-abc.subagent.ts"

const ONE: FileChange = { kind: "replace", path: "one.md", contentFrom: "was", contentTo: "now" }

const TWO: FileChange = { kind: "remove", path: "two.md" }

function seatWith(rows: readonly FileChange[]): string {
  const root = scratch.rootFor("subagent-edits-acting-")
  appendEdits(root, UNDER, rows)
  movedOnto(root, SEAT, UNDER)
  return root
}

function fileAt(root: string): string {
  return join(root, seatEditsAt(SEAT) ?? "")
}

function seatHolding(lines: readonly string[]): string {
  const root = scratch.rootFor("subagent-edits-acting-")
  const at = fileAt(root)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, lines.map((one) => `${one}\n`).join(""))
  return root
}

test("a record is named with the subagent that left it and what that record does", () => {
  const root = seatWith([ONE])

  const said = listingRecords(root, SEAT).report
  expect(said[0]).toContain("1. tester-abc, ")
  expect(said[0]).toContain("changes one.md")
})

test("a listing says a record cannot be judged landed rather than naming a landing", () => {
  const root = seatWith([ONE])

  const said = listingRecords(root, SEAT).report
  expect(said.some((one) => one.includes("undecidable"))).toBe(true)
  expect(said.some((one) => one.includes("no command lands a record kept here"))).toBe(true)
})

test("an agent keeping no record is said rather than refused", () => {
  const root = scratch.rootFor("subagent-edits-acting-")

  const said = listingRecords(root, SEAT)
  expect(said.code).toBe(0)
  expect(said.report).toEqual([
    "no records are kept beside this agent's page for the subagents under it",
  ])
})

test("a record kept before a carry said who left it is named as saying neither", () => {
  const root = seatHolding([JSON.stringify(TWO)])

  expect(listingRecords(root, SEAT).report[0]).toBe(
    "1. no subagent said, no time said — takes two.md away"
  )
})

test("a line that reads as no edit is named rather than refusing the file", () => {
  const root = seatHolding(["not an edit", JSON.stringify(TWO)])

  const said = listingRecords(root, SEAT).report
  expect(said[0]).toContain("this line reads as no edit")
  expect(said[1]).toContain("takes two.md away")
})

test("the records are named in the order the seat took them", () => {
  const root = seatWith([ONE, TWO])

  const said = listingRecords(root, SEAT).report
  expect(said[0]).toContain("changes one.md")
  expect(said[1]).toContain("takes two.md away")
})

test("a show answers the old text and the new text of the record at a path", () => {
  const root = seatWith([ONE])

  const said = showingRecords(root, SEAT, "one.md").report
  expect(said).toContain("old, 1 line\nwas")
  expect(said).toContain("new, 1 line\nnow")
})

test("a path naming no record refuses a show", () => {
  const root = seatWith([ONE])

  expect(showingRecords(root, SEAT, "three.md").code).not.toBe(0)
})

test("a drop naming a path takes that record away and leaves the rest", () => {
  const root = seatWith([ONE, TWO])

  expect(droppingRecords(root, SEAT, ["one.md"]).code).toBe(0)
  expect(recordsKept(root, SEAT).map((one) => one.edit?.kind)).toEqual(["remove"])
})

test("a drop naming no path takes every record away and the file goes", () => {
  const root = seatWith([ONE, TWO])

  expect(droppingRecords(root, SEAT, []).code).toBe(0)
  expect(recordsKept(root, SEAT)).toEqual([])
  expect(existsSync(fileAt(root))).toBe(false)
})

test("a path naming no record refuses a drop and leaves every record", () => {
  const root = seatWith([ONE])

  expect(droppingRecords(root, SEAT, ["three.md"]).code).not.toBe(0)
  expect(recordsKept(root, SEAT).length).toBe(1)
})

test("a drop over an agent keeping no record is said rather than refused", () => {
  const root = scratch.rootFor("subagent-edits-acting-")

  expect(droppingRecords(root, SEAT, []).code).toBe(0)
})

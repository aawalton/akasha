import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  movedOnto,
  seatEditsAt,
} from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  appendEdits,
  editsIn,
} from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import {
  droppingRecords,
  listingRecords,
  recordsKept,
  showingRecords,
  takingRecords,
} from "akasha/command/pages/change/subagent/modules/subagent-edits-acting/subagent-edits-acting.module.code.ts"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const SEAT = "agent/seat/pages/tester/tester.seat.ts"

const UNDER = "agent/subagent/pages/tester-abc/tester-abc.subagent.ts"

const ONE: FileChange = { kind: "replace", path: "one.md", contentFrom: "was", contentTo: "now" }

const TWO: FileChange = { kind: "remove", path: "two.md" }

const AT = "one.md"

const WAS: FileChange = { kind: "replace", path: AT, contentFrom: "was\n", contentTo: "now\n" }

const THEN: FileChange = { kind: "replace", path: AT, contentFrom: "now\n", contentTo: "then\n" }

const INSIDE: FileChange = {
  kind: "replace",
  path: AT,
  contentFrom: "one\n",
  contentTo: "one\ntwo\n",
}

function seatWith(rows: readonly FileChange[]): string {
  const root = scratch.rootFor("subagent-edits-acting-")
  appendEdits(root, UNDER, rows)
  movedOnto(root, SEAT, UNDER)
  return root
}

function seatOver(rows: readonly FileChange[], body: string): string {
  const root = scratch.rootFor("subagent-edits-acting-")
  put(root, AT, body)
  appendEdits(root, UNDER, rows)
  movedOnto(root, SEAT, UNDER)
  return root
}

function ownEdits(root: string): readonly FileChange[] {
  const held = editsIn(root, SEAT)
  return "why" in held ? [] : held.rows
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

test("a listing says a record cannot be judged landed and names the call taking one", () => {
  const root = seatWith([ONE])

  const said = listingRecords(root, SEAT).report
  expect(said.some((one) => one.includes("undecidable"))).toBe(true)
  expect(said.some((one) => one.includes("akasha change subagent take"))).toBe(true)
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

test("a record the body fits and has not landed is taken into the edits this agent keeps", () => {
  const root = seatOver([WAS], "was\n")

  expect(takingRecords(root, SEAT, [AT], false).code).toBe(0)
  expect(ownEdits(root)).toEqual([WAS])
})

test("a record taken is no longer kept for the subagent that left it", () => {
  const root = seatOver([WAS], "was\n")

  takingRecords(root, SEAT, [AT], false)
  expect(recordsKept(root, SEAT)).toEqual([])
})

test("a take names the call that lands what that take kept", () => {
  const root = seatOver([WAS], "was\n")

  expect(takingRecords(root, SEAT, [AT], false).report).toContain(
    "`akasha change apply` lands them"
  )
})

test("a record whose old text sits inside its new cannot be judged landed", () => {
  const root = seatOver([INSIDE], "one\ntwo\n")

  const said = takingRecords(root, SEAT, [AT], false)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("undecidable")
})

test("a record that cannot be judged landed leaves every record kept and keeps no edit", () => {
  const root = seatOver([INSIDE], "one\ntwo\n")

  takingRecords(root, SEAT, [AT], false)
  expect(recordsKept(root, SEAT).length).toBe(1)
  expect(ownEdits(root)).toEqual([])
})

test("a record that cannot be judged landed names the call reading that record whole", () => {
  const root = seatOver([INSIDE], "one\ntwo\n")

  expect(takingRecords(root, SEAT, [AT], false).refusals.join("\n")).toContain(
    "akasha change subagent show"
  )
})

test("a record that cannot be judged landed is taken where the caller says it is unlanded", () => {
  const root = seatOver([INSIDE], "one\ntwo\n")

  expect(takingRecords(root, SEAT, [AT], true).code).toBe(0)
  expect(ownEdits(root)).toEqual([INSIDE])
})

test("a record whose text the body already leaves reads as landed already", () => {
  const root = seatOver([WAS], "now\n")

  const said = takingRecords(root, SEAT, [AT], false)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("landed already")
})

test("a record the body fits nowhere and leaves nothing of reads as stale", () => {
  const root = seatOver([WAS], "other\n")

  const said = takingRecords(root, SEAT, [AT], false)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("fits nothing here")
})

test("a record said to be unlanded is held back all the same where it fits nothing", () => {
  const root = seatOver([WAS], "other\n")

  expect(takingRecords(root, SEAT, [AT], true).code).not.toBe(0)
})

test("a chain of records over one path is taken whole and in order", () => {
  const root = seatOver([WAS, THEN], "was\n")

  expect(takingRecords(root, SEAT, [AT], false).code).toBe(0)
  expect(ownEdits(root)).toEqual([WAS, THEN])
})

test("a path naming no record refuses a take and leaves every record", () => {
  const root = seatOver([WAS], "was\n")

  expect(takingRecords(root, SEAT, ["three.md"], false).code).not.toBe(0)
  expect(recordsKept(root, SEAT).length).toBe(1)
})

test("a record whose line reads as no edit is taken by nothing", () => {
  const root = seatOver([WAS], "was\n")
  const at = join(root, seatEditsAt(SEAT) ?? "")
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, `not an edit\n${JSON.stringify(WAS)}\n`)

  expect(takingRecords(root, SEAT, [], false).code).toBe(0)
  expect(recordsKept(root, SEAT).map((one) => one.line)).toEqual(["not an edit"])
})

test("a take over an agent keeping no record is said rather than refused", () => {
  const root = scratch.rootFor("subagent-edits-acting-")

  expect(takingRecords(root, SEAT, [], false).code).toBe(0)
})

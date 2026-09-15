import { expect, test } from "bun:test"
import { OK } from "akasha/command/modules/answering/command-answering.module.code.ts"
import {
  agreementSaid,
  answerFor,
  coverageSaid,
  type RecordParityJson,
  rowsFrom,
  rowsSaid,
  type StackReading,
  uncoveredSaid,
} from "akasha/command/pages/temper/inventory/record-parity/temper-inventory-record-parity.command.code.ts"
import type { Verdict } from "akasha/temper/command/modules/inventory-resolved-verdict-reading/inventory-resolved-verdict-reading.module.code.ts"

const LOCKPICK = 30357

const STOCKED: Verdict = { action: "stock", destination: null, by: "ordered-rule", ruleIndex: 3 }

const SOLD: Verdict = { action: "sell", destination: null, by: "ordered-rule", ruleIndex: 3 }

const DISAGREEING: RecordParityJson = {
  items: 412,
  stacks: 1979,
  recordedStacks: 1205,
  itemsCompared: 300,
  itemsUncovered: 112,
  inventoryPath: "/held/TemperInventory.lua",
  rules: 90,
  agreed: 299,
  disagreed: 1,
  rows: [
    {
      itemId: LOCKPICK,
      itemName: "Lockpick",
      stacks: 1,
      recorded: STOCKED,
      fresh: SOLD,
      differing: ["action"],
    },
  ],
}

const AGREEING: RecordParityJson = { ...DISAGREEING, agreed: 300, disagreed: 0, rows: [] }

function reading(recorded: Verdict, freshVerdict: Verdict): StackReading {
  return { itemId: LOCKPICK, itemName: "Lockpick", recorded, fresh: freshVerdict }
}

test("stacks of one item disagreeing the same way are gathered into one row", () => {
  const one = reading(STOCKED, SOLD)
  const rows = rowsFrom([one, one, one])
  expect(rows).toHaveLength(1)
  expect(rows[0]?.stacks).toBe(3)
  expect(rows[0]?.differing).toEqual(["action"])
  const said = rowsSaid(rows, 1).join("\n")
  expect(said).toContain("over 3 stacks")
  expect(said).toContain("recorded  stock")
  expect(said).toContain("fresh     sell")
})

test("an item the record and the fresh reading agree on raises no row", () => {
  expect(rowsFrom([reading(STOCKED, STOCKED)])).toHaveLength(0)
})

test("a run finding nothing says the two agree rather than answering empty", () => {
  const said = rowsSaid([], 300).join("\n")
  expect(said).toContain("(none)")
  expect(said).toContain(agreementSaid(300))
  expect(said).toContain("300 items")
})

test("a run over a capture carrying no record says so rather than saying the two agree", () => {
  const said = rowsSaid([], 0).join("\n")
  expect(said).toContain("no item held carries a record")
  expect(said).not.toContain("reach one answer")
})

test("an item carrying no record is counted apart rather than as a disagreement", () => {
  const counted = {
    items: 412,
    stacks: 1979,
    recordedStacks: 1205,
    itemsCompared: 300,
    itemsUncovered: 112,
  }
  const said = uncoveredSaid(counted).join("\n")
  expect(said).toContain("OUT OF COVERAGE")
  expect(said).toContain("112 items carry no record")
  expect(rowsSaid([], counted.itemsCompared).join("\n")).not.toContain("112")
})

test("how much is covered is counted from the records present", () => {
  const said = coverageSaid({
    items: 412,
    stacks: 1979,
    recordedStacks: 1205,
    itemsCompared: 300,
    itemsUncovered: 112,
  }).join("\n")
  expect(said).toContain("1205 of 1979 stacks")
  expect(said).toContain("60.9%")
  expect(said).toContain("300 of 412 items")
})

test("a disagreement found answers one code and one reason, whichever shape is asked for", () => {
  const lines = answerFor(DISAGREEING, false)
  const oneLine = answerFor(DISAGREEING, true)
  expect(lines.code).not.toBe(OK)
  expect(oneLine.code).toBe(lines.code)
  expect(oneLine.refusals).toEqual(lines.refusals)
})

test("the one line answered carries the whole reading, coverage counted and all", () => {
  const oneLine = answerFor(DISAGREEING, true)
  expect(oneLine.report).toHaveLength(1)
  expect(JSON.parse(oneLine.report[0] ?? "")).toEqual(DISAGREEING)
})

test("a run finding no disagreement answers the code of work done in either shape", () => {
  expect(answerFor(AGREEING, false).code).toBe(OK)
  expect(answerFor(AGREEING, true).code).toBe(OK)
  expect(answerFor(AGREEING, true).refusals).toEqual([])
})

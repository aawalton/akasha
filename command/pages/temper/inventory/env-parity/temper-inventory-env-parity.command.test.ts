import { expect, test } from "bun:test"
import { OK } from "akasha/command/modules/answering/command-answering.module.code.ts"
import {
  agreementSaid,
  answerFor,
  destinationAlone,
  type EnvParityJson,
  rowsFrom,
  rowsSaid,
  type StackReading,
  sideOf,
  sidesAgree,
} from "akasha/command/pages/temper/inventory/env-parity/temper-inventory-env-parity.command.code.ts"
import type { WalkOutcome } from "akasha/temper/items/rules/eval/modules/eval-result/eval-result.module.code.ts"

const EDICT = 71779

function matchedTo(index: number, destination: string, label: string): WalkOutcome {
  return {
    kind: "matched",
    rule: { index, categoryId: "scrolls", action: "stock", verdict: { kind: "matched" } },
    action: "stock",
    destination,
    label,
  }
}

function blindOn(index: number, missingSignal: string): WalkOutcome {
  return {
    kind: "indeterminate",
    indeterminateRules: [
      {
        index,
        categoryId: "scrolls",
        action: "stock",
        verdict: {
          kind: "indeterminate",
          reason: { kind: "condition-unknown", conditionKind: "allStocked", missingSignal },
        },
      },
    ],
  }
}

function reading(explain: WalkOutcome, plan: WalkOutcome): StackReading {
  return {
    itemId: EDICT,
    itemName: "Counterfeit Pardon Edict",
    explain: sideOf(explain),
    plan: sideOf(plan),
  }
}

test("two envs sending one item to two places disagree, and the destination alone is named", () => {
  const rows = rowsFrom([
    reading(matchedTo(39, "bank", "Stock x10"), matchedTo(39, "house-storage:4677", "Stock x10")),
  ])
  expect(rows).toHaveLength(1)
  expect(rows[0]?.destinationAlone).toBe(true)
  const said = rowsSaid(rows, 1).join("\n")
  expect(said).toContain("to bank")
  expect(said).toContain("to house-storage:4677")
  expect(said).toContain("the destination alone differs")
})

test("an env blinded to a signal cannot decide what the seeing env decides", () => {
  const rows = rowsFrom([
    reading(matchedTo(39, "bank", "Stock x10"), blindOn(39, "stock:8796093022338107")),
  ])
  expect(rows).toHaveLength(1)
  expect(rows[0]?.destinationAlone).toBe(false)
  const said = rowsSaid(rows, 1).join("\n")
  expect(said).toContain("matched stock to bank")
  expect(said).toContain("indeterminate")
  expect(said).toContain("39:stock:8796093022338107")
})

test("two envs agreeing on an item raise no row", () => {
  const rows = rowsFrom([
    reading(matchedTo(39, "bank", "Stock x10"), matchedTo(39, "bank", "Stock x10")),
  ])
  expect(rows).toHaveLength(0)
})

test("stacks of one item disagreeing the same way are gathered into one row", () => {
  const one = reading(matchedTo(39, "bank", "Stock x10"), blindOn(39, "bank"))
  const rows = rowsFrom([one, one, one])
  expect(rows).toHaveLength(1)
  expect(rows[0]?.stacks).toBe(3)
  expect(rowsSaid(rows, 1).join("\n")).toContain("over 3 stacks")
})

test("a run finding nothing says the two agree rather than answering empty", () => {
  const said = rowsSaid([], 412).join("\n")
  expect(said).toContain("(none)")
  expect(said).toContain(agreementSaid(412))
  expect(said).toContain("412 items alike")
})

test("an outcome is read down to its kind, action and destination", () => {
  const side = sideOf(matchedTo(39, "bank", "Stock x10"))
  expect(side.kind).toBe("matched")
  expect(side.action).toBe("stock")
  expect(side.destination).toBe("bank")
  expect(sidesAgree(side, sideOf(matchedTo(39, "bank", "Stock x10")))).toBe(true)
  expect(destinationAlone(side, sideOf(matchedTo(39, "craft-bag", "Stock x10")))).toBe(true)
})

const SPLIT: EnvParityJson = {
  inventoryPath: "/held/TemperItems.lua",
  rules: 90,
  items: 412,
  stacks: 1979,
  agreed: 411,
  disagreed: 1,
  destinationAlone: 1,
  rows: rowsFrom([
    reading(matchedTo(39, "bank", "Stock x10"), matchedTo(39, "house-storage:4677", "Stock x10")),
  ]),
}

const ALIKE: EnvParityJson = { ...SPLIT, agreed: 412, disagreed: 0, destinationAlone: 0, rows: [] }

test("the two shapes of one answer carry one code and one reason between them", () => {
  expect(answerFor(SPLIT, false).code).not.toBe(OK)
  expect(answerFor(SPLIT, true).code).toBe(answerFor(SPLIT, false).code)
  expect(answerFor(SPLIT, true).refusals).toEqual(answerFor(SPLIT, false).refusals)
})

test("the shape asked for changes the report and leaves the rows whole", () => {
  const oneLine = answerFor(SPLIT, true)
  expect(oneLine.report).toHaveLength(1)
  expect(JSON.parse(oneLine.report[0] ?? "")).toEqual(SPLIT)
  expect(answerFor(SPLIT, false).report.join("\n")).toContain("house-storage:4677")
})

test("two envs deciding alike answer the code of work done however they are asked", () => {
  expect(answerFor(ALIKE, false).code).toBe(OK)
  expect(answerFor(ALIKE, true).code).toBe(OK)
  expect(answerFor(ALIKE, true).refusals).toEqual([])
})

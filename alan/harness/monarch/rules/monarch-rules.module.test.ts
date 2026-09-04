// These claims were a hand-run script that stood outside akasha, whose first part built a
// case out of rows and checked what `decide` made of it. That part reads nothing and settles the
// same way every run, so it stands here as this module's test rather than as a script someone
// remembers to run. The script's other two parts weigh the live database and stayed with it.
import { expect, test } from "bun:test"
import type { Subject } from "../transaction/monarch-transaction.module.code.ts"
import type { Decision, Rule } from "./monarch-rules.module.code.ts"
import {
  bearsOn,
  clausesMatch,
  decide,
  neighbourhoodIn,
  neighbourhoods,
} from "./monarch-rules.module.code.ts"

const CARD = "Costco Anywhere Visa Card by Citi (...1425)"
const CARD_AGAIN = "Costco Anywhere Visa Card by Citi-1425 (...1425)"
const CHECKING = "Checking (...7151)"

const DAY_MS = 86_400_000

function shape(decision: Decision): string {
  if (decision.kind === "ambiguous") {
    return ["ambiguous", decision.why, [...decision.candidates].sort().join(",")].join(":")
  }
  if (decision.kind === "categorize") {
    return ["categorize", decision.category, String(decision.counterpart)].join(":")
  }
  if (decision.kind === "reserve") return ["reserve", String(decision.counterpart)].join(":")
  return decision.kind
}

function at(
  monarchId: string,
  day: number,
  amount: number,
  account: string,
  merchant: string
): Subject {
  const date = new Date(Date.UTC(2026, 0, 1) + day * DAY_MS).toISOString().slice(0, 10)
  return { monarchId, date, amount, account, merchant, statement: "" }
}

const RULE: Rule = {
  name: "a card payment",
  merchantIs: [],
  merchantContains: ["autopay"],
  descriptionContains: [],
  statementContains: [],
  accountIs: [],
  accountIsNot: [],
  amountSign: "positive",
  amountSignIsNot: null,
  amountIs: [],
  amountIsNot: [],
  counterpart: { withinDays: 7 },
  onOrAfter: null,
  before: null,
  monthIs: [],
  monthIsNot: [],
  note: null,
  outcome: { kind: "categorize", category: "transfer-page-id" },
}

const ROWS: readonly Subject[] = [
  at("A", 0, 100, CARD, "autopay"),
  at("A-leg", 3, -100, CHECKING, "citi"),
  at("B", 0, 250, CARD, "autopay"),
  at("B-leg-1", 2, -250, CHECKING, "citi"),
  at("B-leg-2", 5, -250, CHECKING, "citi"),
  at("C", 0, 777, CARD, "autopay"),
  at("C-leg", 7, -777, CHECKING, "citi"),
  at("D", 14, 777, CARD, "autopay"),
  at("E", 0, 321, CARD, "autopay"),
  at("E-not-a-leg", 1, -321, CARD_AGAIN, "citi"),
  at("F", 40, 100, CARD, "autopay"),
  at("F-leg", 41, -100, CHECKING, "citi"),
]

const EXPECTED: readonly (readonly [string, string])[] = [
  ["A", "categorize:transfer-page-id:A-leg"],
  ["B", "ambiguous:several counterparts:B-leg-1,B-leg-2"],
  ["C", "ambiguous:counterpart contended:C,D"],
  ["D", "ambiguous:counterpart contended:C,D"],
  ["E", "unpaired"],
  ["F", "categorize:transfer-page-id:F-leg"],
]

function rowFor(monarchId: string): Subject {
  const found = ROWS.find((row) => row.monarchId === monarchId)
  if (found === undefined) throw new Error(`${monarchId} left the rows`)
  return found
}

test("the rule reaches every subject the case was built around, and nothing else", () => {
  expect(ROWS.filter((row) => clausesMatch(RULE, row)).map((row) => row.monarchId)).toEqual(
    EXPECTED.map(([monarchId]) => monarchId)
  )
})

test.each(EXPECTED)("%s decides as the case was built to produce", (monarchId, wanted) => {
  expect(shape(decide(RULE, rowFor(monarchId), ROWS))).toBe(wanted)
})

test.each(EXPECTED)("%s decides over its neighbourhood as it does over every row", (monarchId) => {
  const subject = rowFor(monarchId)
  const near = neighbourhoodIn(RULE, subject, ROWS)
  expect(shape(decide(RULE, subject, near))).toBe(shape(decide(RULE, subject, ROWS)))
})

test("the bucketed neighbourhood is the plain one", () => {
  const near = neighbourhoods(ROWS)
  const ids = (rows: readonly Subject[]): readonly string[] =>
    [...rows.map((row) => row.monarchId)].sort()
  for (const [monarchId] of EXPECTED) {
    const subject = rowFor(monarchId)
    expect(ids(near(RULE, subject))).toEqual(ids(neighbourhoodIn(RULE, subject, ROWS)))
  }
})

test("a neighbourhood cut at the window rather than at twice it decides C differently, so the wider bound is load-bearing", () => {
  const subject = rowFor("C")
  const window = RULE.counterpart?.withinDays ?? 0
  const halved = ROWS.filter(
    (row) =>
      bearsOn(RULE, subject, row) &&
      Math.abs(Date.parse(row.date) - Date.parse(subject.date)) <= window * DAY_MS
  )
  expect(shape(decide(RULE, subject, halved))).not.toBe(shape(decide(RULE, subject, ROWS)))
})

test("a rule carrying no counterpart clause consults no other row at all", () => {
  const alone: Rule = { ...RULE, counterpart: null }
  expect(neighbourhoodIn(alone, rowFor("B"), ROWS)).toEqual([])
  expect(shape(decide(alone, rowFor("B"), []))).toBe("categorize:transfer-page-id:null")
})

test("a rule that reaches nothing decides nothing", () => {
  expect(decide(RULE, at("Z", 0, 100, CHECKING, "groceries"), ROWS).kind).toBe("no-match")
})

test("a counterpart in the same account is no counterpart", () => {
  expect(shape(decide(RULE, rowFor("E"), ROWS))).toBe("unpaired")
})

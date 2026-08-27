#!/usr/bin/env bun

import type { HistoryRow } from "./history.ts"
import { readHistory, readNeighbourhood } from "./history.ts"
import { loadCategoryRules } from "./rule-documents.ts"
import type { Decision, Rule } from "./rules.ts"
import type { Subject } from "./transaction.ts"
import { bearsOn, clausesMatch, decide, neighbourhoodIn, neighbourhoods } from "./rules.ts"

function shape(decision: Decision): string {
  if (decision.kind === "ambiguous") {
    return `ambiguous:${decision.why}:${[...decision.candidates].sort().join(",")}`
  }
  if (decision.kind === "categorize") return `categorize:${decision.category}:${decision.counterpart}`
  if (decision.kind === "reserve") return `reserve:${decision.counterpart}`
  return decision.kind
}

function ids(rows: readonly Subject[]): string {
  return [...rows.map((row) => row.monarchId)].sort().join(",")
}

const failures: string[] = []

function claim(held: boolean, what: string): void {
  console.log(`  ${held ? "pass" : "FAIL"}  ${what}`)
  if (!held) failures.push(what)
}

const CARD = "Costco Anywhere Visa Card by Citi (...1425)"
const CARD_AGAIN = "Costco Anywhere Visa Card by Citi-1425 (...1425)"
const CHECKING = "Checking (...7151)"

function at(monarchId: string, day: number, amount: number, account: string, merchant: string): Subject {
  const date = new Date(Date.UTC(2026, 0, 1) + day * 86_400_000).toISOString().slice(0, 10)
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

const expected: ReadonlyMap<string, string> = new Map([
  ["A", "categorize:transfer-page-id:A-leg"],
  ["B", "ambiguous:several counterparts:B-leg-1,B-leg-2"],
  ["C", "ambiguous:counterpart contended:C,D"],
  ["D", "ambiguous:counterpart contended:C,D"],
  ["E", "unpaired"],
  ["F", "categorize:transfer-page-id:F-leg"],
])

console.log("1. the neighbourhood is sufficient, and 2W is tight")

for (const subject of ROWS) {
  if (!clausesMatch(RULE, subject)) continue
  const whole = decide(RULE, subject, ROWS)
  const near = decide(RULE, subject, neighbourhoodIn(RULE, subject, ROWS))
  claim(
    shape(whole) === shape(near),
    `${subject.monarchId}: deciding over the neighbourhood equals deciding over every row ` +
      `(${shape(whole)})`
  )
  claim(
    shape(whole) === expected.get(subject.monarchId),
    `${subject.monarchId}: ${shape(whole)} is what the case was built to produce`
  )
}

{
  const subject = ROWS.find((row) => row.monarchId === "C")
  if (subject === undefined) throw new Error("the contended case left the rows")
  const window = RULE.counterpart?.withinDays ?? 0
  const halved = ROWS.filter(
    (row) => bearsOn(RULE, subject, row) && Math.abs(Date.parse(row.date) - Date.parse(subject.date)) <= window * 86_400_000
  )
  claim(
    shape(decide(RULE, subject, halved)) !== shape(decide(RULE, subject, ROWS)),
    `a neighbourhood cut at W rather than 2W decides C differently ` +
      `(${shape(decide(RULE, subject, halved))} instead of ${shape(decide(RULE, subject, ROWS))}), ` +
      "so the wider bound is load-bearing"
  )
}

const rules = (await loadCategoryRules()).rules
const history = await readHistory()
const near = neighbourhoods(history)

console.log("")
console.log(
  `2. the indexed neighbourhood is the plain one — ${rules.length} rule(s) over ` +
    `${history.length} transaction(s)`
)

const reached: { readonly rule: Rule; readonly row: HistoryRow }[] = []
for (const rule of rules) {
  for (const row of history) if (clausesMatch(rule, row)) reached.push({ rule, row })
}
const paired = reached.filter((entry) => entry.rule.counterpart !== null)

let indexAgrees = 0
for (const { rule, row } of paired) {
  if (ids(near(rule, row)) === ids(neighbourhoodIn(rule, row, history))) indexAgrees += 1
}
claim(
  indexAgrees === paired.length,
  `${indexAgrees} of ${paired.length} pairing subjects get the same neighbourhood from the bucketed ` +
    "index as from a full scan"
)

console.log("")
console.log(`3. proposing and applying decide alike — ${paired.length} pairing subject(s), read one window each`)

let sameRows = 0
let sameDecision = 0
for (const { rule, row } of paired) {
  const proposing = near(rule, row)
  const applying = await readNeighbourhood(rule, row)
  if (ids(proposing) === ids(applying)) sameRows += 1
  if (shape(decide(rule, row, proposing)) === shape(decide(rule, row, applying))) sameDecision += 1
}
claim(
  sameRows === paired.length,
  `${sameRows} of ${paired.length}: the window read from the database holds the same rows the ` +
    "in-memory slice does"
)
claim(
  sameDecision === paired.length,
  `${sameDecision} of ${paired.length}: the two paths reach the same decision`
)

const unpairedReached = reached.length - paired.length
console.log("")
console.log(
  `${unpairedReached} further subject(s) are reached by rules carrying no counterpart clause; ` +
    "for those `decide` consults no other row at all, so the two paths cannot differ."
)

if (failures.length > 0) {
  console.log("")
  console.log(`${failures.length} claim(s) failed:`)
  for (const failure of failures) console.log(`  ${failure}`)
  process.exit(1)
}
console.log("")
console.log("every claim held. Nothing was written; every read ran in a read-only transaction.")

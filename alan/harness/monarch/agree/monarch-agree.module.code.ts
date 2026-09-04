#!/usr/bin/env bun

// The first thing this script did was build a case out of twelve rows and check what `decide`
// made of it. That part settles the same way every run and reads nothing, so it now stands as
// the monarch-rules module's own test. What is left here is what only the live history can say:
// that the two ways of reaching a neighbourhood agree over the rules and rows that actually stand.
import type { HistoryRow } from "../history/monarch-history.module.code.ts"
import { readHistory, readNeighbourhood } from "../history/monarch-history.module.code.ts"
import { loadCategoryRules } from "../rule-documents/monarch-rule-documents.module.code.ts"
import type { Decision, Rule } from "../rules/monarch-rules.module.code.ts"
import {
  clausesMatch,
  decide,
  neighbourhoodIn,
  neighbourhoods,
} from "../rules/monarch-rules.module.code.ts"
import type { Subject } from "../transaction/monarch-transaction.module.code.ts"

function shape(decision: Decision): string {
  if (decision.kind === "ambiguous") {
    return `ambiguous:${decision.why}:${[...decision.candidates].sort().join(",")}`
  }
  if (decision.kind === "categorize") {
    return `categorize:${decision.category}:${decision.counterpart}`
  }
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

const rules = (await loadCategoryRules()).rules
const history = await readHistory()
const near = neighbourhoods(history)

console.log(
  `1. the indexed neighbourhood is the plain one — ${rules.length} rule(s) over ` +
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
console.log(
  `2. proposing and applying decide alike — ${paired.length} pairing subject(s), read one window each`
)

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

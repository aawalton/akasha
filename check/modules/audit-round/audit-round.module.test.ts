import { expect, test } from "bun:test"
import type { Verdicts } from "akasha/check/modules/audit-asking/audit-asking.module.code.ts"
import {
  answeredIn,
  joining,
  owedCarrying,
  type Turned,
  turnedIn,
} from "akasha/check/modules/audit-round/audit-round.module.code.ts"
import { gathered } from "akasha/check/modules/audit-serving/audit-serving.module.test-fixtures.ts"
import type { Verdict } from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"

const NOW = "2026-09-16T00:00:00.000Z"

const CLEAN: Verdict = { commit: "abc", ranAt: NOW, refusals: [], unrun: false }

function held(entries: readonly (readonly [string, Verdict])[]): Verdicts {
  return new Map(entries)
}

const CHECKS = ["no-class", "lint-clean"]

const NOTHING: Turned = { ran: [], turned: [], refused: [] }

test("a check with no verdict after the round is left out rather than written over", () => {
  expect(answeredIn(CHECKS, held([["no-class", CLEAN]])).map((one) => one.check)).toEqual([
    "no-class",
  ])
  expect(turnedIn(CHECKS, held([]), held([]))).toEqual([])
})

test("what is newly refusing is the difference between the two readings", () => {
  const red: Verdict = { ...CLEAN, refusals: ["one.ts — no"] }
  const both: Verdict = { ...CLEAN, refusals: ["one.ts — no", "two.ts — no"] }
  const turned = turnedIn(["no-class"], held([["no-class", red]]), held([["no-class", both]]))
  expect(turned.length).toBe(1)
  expect(turned[0]?.verdict.refusals).toEqual(["two.ts — no"])
})

test("a round whose checks all answered as before turns nothing", () => {
  const red: Verdict = { ...CLEAN, refusals: ["one.ts — no"] }
  expect(turnedIn(["no-class"], held([["no-class", red]]), held([["no-class", red]]))).toEqual([])
})

test("a check refusing for the first time turns", () => {
  const red: Verdict = { ...CLEAN, refusals: ["one.ts — no"] }
  const turned = turnedIn(["no-class"], held([]), held([["no-class", red]]))
  expect(turned.map((one) => one.check)).toEqual(["no-class"])
})

test("a check that turned clean again turns nothing", () => {
  const red: Verdict = { ...CLEAN, refusals: ["one.ts — no"] }
  expect(turnedIn(["no-class"], held([["no-class", red]]), held([["no-class", CLEAN]]))).toEqual([])
})

const GATHERED = [gathered("no-class", "/r"), gathered("lint-clean", "/r")]

test("a request a running round covers attaches to that round rather than opening a second", () => {
  const running = { checks: new Set(["no-class", "lint-clean"]), told: Promise.resolve(NOTHING) }
  expect(joining(running, ["no-class"])).toBe(true)
  expect(joining(running, ["no-class", "lint-clean"])).toBe(true)
})

test("a request naming a check no running round covers opens a round of its own", () => {
  const running = { checks: new Set(["no-class"]), told: Promise.resolve(NOTHING) }
  expect(joining(running, ["no-class", "lint-clean"])).toBe(false)
  expect(joining(undefined, ["no-class"])).toBe(false)
})

test("a check with no verdict yet is carried nowhere and is asked for", () => {
  expect(owedCarrying(GATHERED, held([]), "abc")).toEqual([])
})

test("a check whose verdict is at this commit already is carried nowhere", () => {
  expect(owedCarrying(GATHERED, held([["no-class", CLEAN]]), "abc")).toEqual([])
})

test("a check whose verdict is at an older commit is owed carrying", () => {
  const owed = owedCarrying(GATHERED, held([["no-class", CLEAN]]), "def")
  expect(owed.map((one) => one.slug)).toEqual(["no-class"])
})

test("every check answering is carried back whether that check refused or not", () => {
  const red: Verdict = { ...CLEAN, refusals: ["one.ts — no"] }
  const ran = answeredIn(
    CHECKS,
    held([
      ["no-class", red],
      ["lint-clean", CLEAN],
    ])
  )
  expect(ran.map((one) => one.check).sort()).toEqual(["lint-clean", "no-class"])
})

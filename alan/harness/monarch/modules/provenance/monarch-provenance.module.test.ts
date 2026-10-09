import { expect, test } from "bun:test"
import {
  decidedHere,
  recordDecision,
} from "akasha/alan/harness/monarch/modules/provenance/monarch-provenance.module.code.ts"

test("a category this harness wrote is decided here, and one Monarch carried is not", () => {
  expect(decidedHere("programmatic-categorization")).toBe(true)
  expect(decidedHere("manual-categorization")).toBe(true)
  expect(decidedHere("monarch")).toBe(false)
  expect(decidedHere(null)).toBe(false)
})

test("a decision records both the kind of thing that decided and the one thing that decided", () => {
  expect(
    recordDecision({ source: "programmatic-categorization", decidedBy: "a card payment" })
  ).toEqual({
    categorySource: "programmatic-categorization",
    categoryDecidedBy: "a card payment",
  })
})

test("what is named is trimmed, so blank space names nothing", () => {
  expect(
    recordDecision({ source: "manual-categorization", decidedBy: "  Alan  " }).categoryDecidedBy
  ).toBe("Alan")
})

test("a decision naming nothing that decided is refused rather than written", () => {
  expect(() => recordDecision({ source: "manual-categorization", decidedBy: "   " })).toThrow(
    "decision named nothing that decided it"
  )
})

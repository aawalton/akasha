import { expect, test } from "bun:test"
import { recordDecision } from "./monarch-provenance.module.code.ts"

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
  expect(() => recordDecision({ source: "semantic-categorization", decidedBy: "   " })).toThrow(
    "decision named nothing that decided it"
  )
})

import { expect, test } from "bun:test"
import {
  RRULE_OPS,
  rruleRefusal,
} from "akasha/page/core/property-type/modules/rrule/rrule.module.code.ts"

const SHAPE = "rrule value must be a rule or an object holding one"

test("the property type validates by the one refusal the page check gives", () => {
  expect(RRULE_OPS.validate).toBe(rruleRefusal)
})

test("a rule alone is a value", () => {
  expect(rruleRefusal("FREQ=DAILY")).toBe(null)
  expect(rruleRefusal("FREQ=MONTHLY;BYDAY=2MO,4MO")).toBe(null)
})

test("a rule beside what it counts from is a value", () => {
  expect(rruleRefusal({ rule: "FREQ=WEEKLY;BYDAY=TU", anchorFromCompletion: true })).toBe(null)
})

test("no value is no refusal", () => {
  expect(rruleRefusal(null)).toBe(null)
  expect(rruleRefusal(undefined)).toBe(null)
})

test("a value that is neither a rule nor a record is refused", () => {
  expect(rruleRefusal(3)).toBe(SHAPE)
  expect(rruleRefusal(["FREQ=DAILY"])).toBe(SHAPE)
})

test("an empty rule is refused", () => {
  expect(rruleRefusal("")).toBe("rrule.rule must be non-empty")
  expect(rruleRefusal({ rule: "", anchorFromCompletion: false })).toBe(
    "rrule.rule must be non-empty"
  )
})

test("a record whose rule is no text or whose anchor is no boolean is refused", () => {
  expect(rruleRefusal({ rule: 3, anchorFromCompletion: false })).toBe("rrule.rule must be a string")
  expect(rruleRefusal({ rule: "FREQ=DAILY" })).toBe("rrule.anchorFromCompletion must be a boolean")
})

test("a rule that would read as its text is refused, and the refusal says why", () => {
  const why =
    "`FREQ=MONTHLY;BYDAY=-2MO` is a rule the recurrence wording does not cover, so it would read as that text rather than as words"
  expect(rruleRefusal("FREQ=MONTHLY;BYDAY=-2MO")).toBe(why)
  expect(rruleRefusal({ rule: "FREQ=MONTHLY;BYDAY=-2MO", anchorFromCompletion: true })).toBe(why)
})

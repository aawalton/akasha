import { expect, test } from "bun:test"
import { ranOver } from "akasha/check/modules/run-ceiling/run-ceiling.module.code.ts"
import {
  BURNS_AT,
  costing,
  GATHERED,
} from "akasha/check/modules/run-ceiling/run-ceiling.module.test-fixtures.ts"

test("a check at its ceiling refuses nothing, and one over it names its own page", () => {
  const one = { ...GATHERED, checkCeiling: 1 }
  expect(ranOver(one, "check", costing(0.6, 0.4))).toBe(null)
  const said = ranOver(one, "check", costing(1.2, 0))
  expect(said?.path).toBe(BURNS_AT)
  expect(said?.reason).toContain("spent 1.2 processor seconds judging this change, over the 1")
})

test("the time counted is the check's own together with what the check spawns", () => {
  const one = { ...GATHERED, checkCeiling: 1 }
  expect(ranOver(one, "check", costing(0.9, 0.05))).toBe(null)
  expect(ranOver(one, "check", costing(0.05, 1.5))?.reason).toContain("spent 1.55 processor")
})

test("a group stating no ceiling refuses nothing however long its check runs", () => {
  expect(ranOver(GATHERED, "check", costing(600, 600))).toBe(null)
  expect(ranOver({ ...GATHERED, checkCeiling: null }, "check", costing(600, 600))).toBe(null)
})

test("the group whose code ran decides which group states the ceiling", () => {
  const one = { ...GATHERED, checkCeiling: 9, auditCeiling: 1 }
  expect(ranOver(one, "check", costing(2, 0))).toBe(null)
  expect(ranOver(one, "audit", costing(2, 0))?.reason).toContain("over the 1 its page states")
})

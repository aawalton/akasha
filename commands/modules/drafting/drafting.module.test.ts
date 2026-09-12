import { expect, test } from "bun:test"
import { runningOf } from "akasha/commands/modules/drafting/drafting.module.code.ts"
import {
  BOTH_RUN,
  CHECKS_RUN,
  kindOf,
  NOTHING_RUNS,
} from "akasha/commands/modules/drafting/drafting.module.test-fixtures.ts"

test("a change kind says what a run does, its checks apart from each reading owed", () => {
  expect(runningOf(kindOf(true, false, false))).toEqual(CHECKS_RUN)
  expect(runningOf(kindOf(false, false, false))).toEqual(NOTHING_RUNS)
})

test("a call carrying no change kind runs every check and owes every reading", () => {
  expect(runningOf(undefined)).toEqual(BOTH_RUN)
})

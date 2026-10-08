import { expect, test } from "bun:test"
import {
  runningOf,
  stamped,
} from "akasha/command/modules/change-kind-running/change-kind-running.module.code.ts"
import {
  BOTH_RUN,
  CHECKS_RUN,
  kindOf,
  NOTHING_RUNS,
} from "akasha/command/modules/change-kind-running/change-kind-running.module.test-fixtures.ts"
import {
  EDIT,
  HELD,
} from "akasha/command/modules/change-running/change-running.module.test-fixtures.ts"

test("a change kind says what a run does, its checks apart from each reading owed", () => {
  expect(runningOf(kindOf(true, false, false))).toEqual(CHECKS_RUN)
  expect(runningOf(kindOf(false, false, false))).toEqual(NOTHING_RUNS)
})

test("a call carrying no change kind runs every check and owes every reading", () => {
  expect(runningOf(undefined)).toEqual(BOTH_RUN)
})

test("a change owing its readers no reading stamps that on every edit it answers", () => {
  const said = stamped(HELD, false, true)

  expect(said.edits).toEqual([{ ...EDIT, readersOweReading: false }])
})

test("a change whose writer owes no reading stamps that on every edit it answers", () => {
  const said = stamped(HELD, true, false)

  expect(said.edits).toEqual([{ ...EDIT, writerOwesReading: false }])
})

test("a change whose kind runs no check stamps that on every edit it answers", () => {
  const said = stamped(HELD, true, true, false)

  expect(said.edits).toEqual([{ ...EDIT, runsChecks: false }])
})

test("a change owing its readers reading stamps nothing on the edits it answers", () => {
  const said = stamped(HELD, true, true)

  expect(said.edits).toEqual([EDIT])
})

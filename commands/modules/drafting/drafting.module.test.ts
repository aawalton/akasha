import { afterAll, expect, test } from "bun:test"
import { headOf, owedOf, runningOf } from "./drafting.module.code.ts"
import {
  BOTH_RUN,
  CHECKS_RUN,
  kindOf,
  NOTHING_RUNS,
  ONE,
  repoAt,
  scratch,
  TWO,
} from "./drafting.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a change kind says what a run does, its checks apart from each reading owed", () => {
  expect(runningOf(kindOf(true, false, false))).toEqual(CHECKS_RUN)
  expect(runningOf(kindOf(false, false, false))).toEqual(NOTHING_RUNS)
})

test("a call carrying no change kind runs every check and owes every reading", () => {
  expect(runningOf(undefined)).toEqual(BOTH_RUN)
})

test("what a path's readers owe is read off the paths saying so and no others", () => {
  const said = owedOf(
    new Map([
      [ONE, { was: null, body: null, readersOweReading: false }],
      [TWO, { was: null, body: null }],
    ])
  )

  expect(said.get(ONE)).toBe(false)
  expect(said.has(TWO)).toBe(false)
})

test("the commit at HEAD is read as the hash naming it", () => {
  expect(headOf(repoAt())).toMatch(/^[0-9a-f]{40}$/)
})

import { expect, test } from "bun:test"
import { liftedIn } from "akasha/alan/value/health/fitness/strength/modules/lifting/lifting.computed-property-module.code.ts"

const BARE = { weight: 0, implementCount: 1, loadFactor: 0, bodyweight: 177.9, reps: 0 }

test("a set is worth the load it moves once for each rep", () => {
  expect(liftedIn({ ...BARE, weight: 30, reps: 10 })).toBe(300)
})

test("the load counts the weight once for each implement held", () => {
  expect(liftedIn({ ...BARE, weight: 30, implementCount: 2, reps: 10 })).toBe(600)
})

test("the load counts the share of the lifter's own weight the movement carries", () => {
  expect(liftedIn({ ...BARE, loadFactor: 0.5, reps: 10 })).toBe(889.5)
})

test("a set carrying no load and a set counting no rep come out at nought", () => {
  expect(liftedIn({ ...BARE, reps: 10 })).toBe(0)
  expect(liftedIn({ ...BARE, weight: 30 })).toBe(0)
})

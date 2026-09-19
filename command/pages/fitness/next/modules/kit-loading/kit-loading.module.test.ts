import { expect, test } from "bun:test"
import {
  coveredBy,
  easedTo,
  type Kit,
  kitIn,
  loadsFor,
  topLoadFor,
} from "akasha/command/pages/fitness/next/modules/kit-loading/kit-loading.module.code.ts"

const DUMBBELLS: Kit = { covers: ["dumbbell"], loads: [3, 5, 8, 10, 15, 20, 25, 30] }

const KIT = [DUMBBELLS]

test("kit Alan does not have to hand offers no loads", () => {
  const read = kitIn([
    { available: true, covers: ["strength-exercise-implement/dumbbell"], loads: [10, 20] },
    { available: false, covers: ["strength-exercise-implement/barbell"], loads: [45] },
  ])
  expect(read).toEqual([{ covers: ["dumbbell"], loads: [10, 20] }])
  expect(coveredBy(read)).toEqual(new Set(["dumbbell"]))
})

test("the loads are read off the kit covering the movement", () => {
  expect(loadsFor(KIT, "dumbbell")).toEqual([3, 5, 8, 10, 15, 20, 25, 30])
  expect(topLoadFor(KIT, "dumbbell")).toBe(30)
  expect(topLoadFor(KIT, "barbell")).toBe(null)
})

test("a load asked for by a target is the heaviest load at or under that target", () => {
  expect(easedTo(DUMBBELLS.loads, 15)).toBe(15)
  expect(easedTo(DUMBBELLS.loads, 12)).toBe(10)
})

test("a target under every load Alan owns is answered with the lightest he owns", () => {
  expect(easedTo(DUMBBELLS.loads, 1)).toBe(3)
  expect(easedTo([], 15)).toBe(null)
})

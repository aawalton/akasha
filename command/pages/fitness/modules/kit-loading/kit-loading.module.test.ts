import { expect, test } from "bun:test"
import { barbell } from "akasha/alan/value/health/fitness/strength/exercise/implement/pages/barbell.strength-exercise-implement.ts"
import { dumbbell } from "akasha/alan/value/health/fitness/strength/exercise/implement/pages/dumbbell.strength-exercise-implement.ts"
import { strengthExerciseImplement } from "akasha/alan/value/health/fitness/strength/exercise/implement/strength-exercise-implement.page-type.ts"
import {
  coveredBy,
  easedTo,
  type Kit,
  kitIn,
  loadsFor,
  topLoadFor,
} from "akasha/command/pages/fitness/modules/kit-loading/kit-loading.module.code.ts"

const DUMBBELL_AT = `${strengthExerciseImplement.slug}/${dumbbell.slug}` as const

const BARBELL_AT = `${strengthExerciseImplement.slug}/${barbell.slug}` as const

const DUMBBELLS: Kit = { covers: [dumbbell.slug], loads: [3, 5, 8, 10, 15, 20, 25, 30] }

const KIT = [DUMBBELLS]

test("kit Alan does not have to hand offers no loads", () => {
  const read = kitIn([
    { available: true, covers: [DUMBBELL_AT], loads: [10, 20] },
    { available: false, covers: [BARBELL_AT], loads: [45] },
  ])
  expect(read).toEqual([{ covers: [dumbbell.slug], loads: [10, 20] }])
  expect(coveredBy(read)).toEqual(new Set([dumbbell.slug]))
})

test("the loads are read off the kit covering the movement", () => {
  expect(loadsFor(KIT, dumbbell.slug)).toEqual([3, 5, 8, 10, 15, 20, 25, 30])
  expect(topLoadFor(KIT, dumbbell.slug)).toBe(30)
  expect(topLoadFor(KIT, barbell.slug)).toBe(null)
})

test("a load asked for by a target is the heaviest load at or under that target", () => {
  expect(easedTo(DUMBBELLS.loads, 15)).toBe(15)
  expect(easedTo(DUMBBELLS.loads, 12)).toBe(10)
})

test("a target under every load Alan owns is answered with the lightest he owns", () => {
  expect(easedTo(DUMBBELLS.loads, 1)).toBe(3)
  expect(easedTo([], 15)).toBe(null)
})

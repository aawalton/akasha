import { expect, test } from "bun:test"
import { day } from "akasha/alan/track/daily/day/day.page-type.ts"
import { day20260917 } from "akasha/alan/track/daily/day/pages/2026-09-17/day-2026-09-17.day.ts"
import { day20260918 } from "akasha/alan/track/daily/day/pages/2026-09-18/day-2026-09-18.day.ts"
import { fitnessEquipment } from "akasha/alan/value/health/fitness/equipment/fitness-equipment.page-type.ts"
import { dumbbells } from "akasha/alan/value/health/fitness/equipment/pages/dumbbells/dumbbells.fitness-equipment.ts"
import { gym } from "akasha/alan/value/health/fitness/gym/gym.page-type.ts"
import { home } from "akasha/alan/value/health/fitness/gym/pages/home/home.gym.ts"
import { recCenter } from "akasha/alan/value/health/fitness/gym/pages/rec-center/rec-center.gym.ts"
import { barbell } from "akasha/alan/value/health/fitness/strength/exercise/implement/pages/barbell.strength-exercise-implement.ts"
import { dumbbell } from "akasha/alan/value/health/fitness/strength/exercise/implement/pages/dumbbell.strength-exercise-implement.ts"
import { strengthExerciseImplement } from "akasha/alan/value/health/fitness/strength/exercise/implement/strength-exercise-implement.page-type.ts"
import {
  coveredBy,
  type Gym,
  gymOn,
  gymsIn,
  HOME,
  kitAt,
  kitIn,
} from "akasha/command/pages/fitness/cooldown/modules/kit-loading/kit-loading.module.code.ts"

const DUMBBELL_AT = `${strengthExerciseImplement.slug}/${dumbbell.slug}` as const

const BARBELL_AT = `${strengthExerciseImplement.slug}/${barbell.slug}` as const

const DUMBBELLS_AT = `${fitnessEquipment.slug}/${dumbbells.slug}` as const

const REC_CENTER_AT = `${gym.slug}/${recCenter.slug}` as const

const TODAY = day20260918.date

const EIGHTEENTH = `${day.slug}/${day20260918.slug}` as const

const SEVENTEENTH = `${day.slug}/${day20260917.slug}` as const

const PIECES = [
  { slug: dumbbells.slug, available: true, covers: [DUMBBELL_AT], loads: [10, 30] },
  { slug: "barbell-rack", available: true, covers: [BARBELL_AT], loads: [45] },
  { slug: "vest", available: false, covers: [], loads: [20] },
]

const HOME_GYM: Gym = { slug: home.slug, everyImplement: false, holds: [dumbbells.slug, "vest"] }

const EVERY: Gym = { slug: recCenter.slug, everyImplement: true, holds: [] }

test("kit Alan does not have to hand offers no loads", () => {
  const read = kitIn([
    { available: true, covers: [DUMBBELL_AT], loads: [10, 20] },
    { available: false, covers: [BARBELL_AT], loads: [45] },
  ])
  expect(read).toEqual([{ covers: [dumbbell.slug], loads: [10, 20] }])
  expect(coveredBy(read)).toEqual(new Set([dumbbell.slug]))
})

test("the kit at a gym is the pieces that gym holds which are available", () => {
  expect(kitAt(HOME_GYM, PIECES, [])).toEqual([{ covers: [dumbbell.slug], loads: [10, 30] }])
})

test("a gym holding every implement covers every implement", () => {
  const kit = kitAt(EVERY, PIECES, [dumbbell.slug, barbell.slug])
  expect(coveredBy(kit)).toEqual(new Set([dumbbell.slug, barbell.slug]))
})

test("a gym is read with the pieces it holds", () => {
  const read = gymsIn([
    { slug: home.slug, everyImplement: false, holds: [DUMBBELLS_AT] },
    { slug: recCenter.slug, everyImplement: true },
  ])
  expect(read.get(home.slug)).toEqual({
    slug: home.slug,
    everyImplement: false,
    holds: [dumbbells.slug],
  })
  expect(read.get(recCenter.slug)?.everyImplement).toBe(true)
})

test("Alan is at the gym today's latest set names", () => {
  const sets = [
    { day: EIGHTEENTH, setPerformedAt: "2026-09-18T15:00:00.000Z", gym: REC_CENTER_AT },
    { day: EIGHTEENTH, setPerformedAt: "2026-09-18T09:00:00.000Z" },
  ]
  expect(gymOn(sets, TODAY)).toBe(recCenter.slug)
})

test("a latest set naming no gym was performed at home", () => {
  const sets = [
    { day: EIGHTEENTH, setPerformedAt: "2026-09-18T09:00:00.000Z", gym: REC_CENTER_AT },
    { day: EIGHTEENTH, setPerformedAt: "2026-09-18T15:00:00.000Z" },
  ]
  expect(gymOn(sets, TODAY)).toBe(HOME)
})

test("Alan is at home where no set today names a gym", () => {
  expect(gymOn([{ day: SEVENTEENTH, gym: REC_CENTER_AT }], TODAY)).toBe(HOME)
  expect(gymOn([], TODAY)).toBe(HOME)
})

import { getMountainMorningDayStr } from "akasha/alan/harness/day-boundary/modules/mountain-day/mountain-day.module.code.ts"
import { selectionPolicy } from "akasha/alan/value/health/fitness/selection-policy/pages/selection-policy.selection-policy.ts"
import { primaryMuscles } from "akasha/alan/value/health/fitness/strength/exercise/properties/primary-muscles.select-property.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  type Movement,
  nearFailureIn,
  type TrainingWeek,
  weekIn,
} from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import { fitnessNext as page } from "akasha/command/pages/fitness/next/fitness-next.command.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  numberAt,
  slugAt,
  slugsIn,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const KIT_TYPE = "fitness-equipment"

const BODY_ONLY = "body-only"

const UNRANKED = ["stretching", "cardio"]

export type Kit = {
  readonly covers: readonly string[]
  readonly loads: readonly number[]
}

export type Mark = {
  readonly sets: number
  readonly weight: number | null
  readonly reps: number | null
}

export type Offer = {
  readonly movement: string
  readonly title: string
  readonly muscle: string
  readonly owed: number
  readonly weight: number | null
  readonly reps: number | null
  readonly atKitCeiling: boolean
  readonly familiar: boolean
}

export function kitIn(pages: readonly Value[]): readonly Kit[] {
  const held: Kit[] = []
  for (const one of pages) {
    if (one.available !== true) continue
    const loads = Array.isArray(one.loads)
      ? one.loads.filter((each): each is number => typeof each === "number")
      : []
    held.push({ covers: slugsIn(one.covers), loads })
  }
  return held
}

export function coveredBy(kit: readonly Kit[]): ReadonlySet<string> {
  return new Set(kit.flatMap((one) => [...one.covers]))
}

export function topLoadFor(kit: readonly Kit[], implement: string): number | null {
  const loads = kit.filter((one) => one.covers.includes(implement)).flatMap((one) => [...one.loads])
  return loads.length === 0 ? null : Math.max(...loads)
}

export function loadable(one: Movement, covered: ReadonlySet<string>): boolean {
  if (one.category !== null && UNRANKED.includes(one.category)) return false
  if (one.implement === null || one.implement === BODY_ONLY) return true
  return covered.has(one.implement)
}

export function owedIn(took: ReadonlyMap<string, number>, low: number): readonly string[] {
  return [...primaryMuscles.values]
    .map((one) => ({ one, owed: low - (took.get(one) ?? 0) }))
    .filter((held) => held.owed > 0)
    .sort((a, b) => b.owed - a.owed || a.one.localeCompare(b.one))
    .map((held) => held.one)
}

export function marksIn(
  sets: readonly Value[],
  nearFailure: number,
  before: string
): ReadonlyMap<string, Mark> {
  const held = new Map<string, Mark>()
  for (const one of sets) {
    const on = textAt(one, "setLogDate")
    const named = slugAt(one, "exercise")
    if (on === null || named === null || on > before) continue
    if (!nearFailureIn(one, nearFailure)) continue
    const weight = numberAt(one, "weight")
    const reps = numberAt(one, "reps")
    const was = held.get(named) ?? { sets: 0, weight: null, reps: null }
    const heavier = (weight ?? 0) > (was.weight ?? 0)
    const sameWeight = (weight ?? 0) === (was.weight ?? 0)
    const better = heavier || (sameWeight && (reps ?? 0) > (was.reps ?? 0))
    held.set(named, {
      sets: was.sets + 1,
      weight: better ? weight : was.weight,
      reps: better ? reps : was.reps,
    })
  }
  return held
}

export function doneOn(
  sets: readonly Value[],
  day: string,
  nearFailure: number
): readonly string[] {
  const named: string[] = []
  for (const one of sets) {
    if (textAt(one, "setLogDate") !== day || !nearFailureIn(one, nearFailure)) continue
    const slug = slugAt(one, "exercise")
    if (slug !== null) named.push(slug)
  }
  return named
}

function coverage(week: TrainingWeek, one: Movement): number {
  return one.pattern === null ? 0 : (week.tally.patterns.get(one.pattern) ?? 0)
}

export function chosenFor(
  week: TrainingWeek,
  muscle: string,
  covered: ReadonlySet<string>,
  marks: ReadonlyMap<string, Mark>,
  ceiling: number,
  newnessLeft: number
): Movement | null {
  const able = [...week.movements.values()].filter((one) => {
    if (!one.muscles.includes(muscle) || !loadable(one, covered)) return false
    if (one.muscles.every((each) => (week.tally.muscles.get(each) ?? 0) >= ceiling)) return false
    return (marks.get(one.slug)?.sets ?? 0) > 0 || newnessLeft > 0
  })
  const sorted = [...able].sort((a, b) => {
    const seen = (marks.get(b.slug)?.sets ?? 0) - (marks.get(a.slug)?.sets ?? 0)
    return (
      coverage(week, a) - coverage(week, b) ||
      seen ||
      (b.sfr ?? 0) - (a.sfr ?? 0) ||
      a.slug.localeCompare(b.slug)
    )
  })
  return sorted[0] ?? null
}

export function offerOf(
  week: TrainingWeek,
  kit: readonly Kit[],
  marks: ReadonlyMap<string, Mark>,
  low: number,
  ceiling: number,
  newnessLeft: number
): Offer | null {
  const covered = coveredBy(kit)
  for (const muscle of owedIn(week.tally.muscles, low)) {
    const one = chosenFor(week, muscle, covered, marks, ceiling, newnessLeft)
    if (one === null) continue
    const mark = marks.get(one.slug) ?? null
    const top = one.implement === null ? null : topLoadFor(kit, one.implement)
    const atKitCeiling = mark?.weight != null && top !== null && mark.weight >= top
    return {
      movement: one.slug,
      title: one.title ?? one.slug,
      muscle,
      owed: low - (week.tally.muscles.get(muscle) ?? 0),
      weight: mark?.weight ?? null,
      reps: mark?.reps === null || mark?.reps === undefined ? null : mark.reps + 1,
      atKitCeiling,
      familiar: (mark?.sets ?? 0) > 0,
    }
  }
  return null
}

export function saidOf(offer: Offer | null): readonly string[] {
  if (offer === null) return ["nothing is owed and nothing is loadable — rest is the answer today"]
  const load =
    offer.weight === null
      ? "  find a load that takes you near failure inside eight to twelve reps"
      : `  ${String(offer.weight)} lb, ${offer.reps === null ? "near failure" : `${String(offer.reps)} reps`}`
  const said = [offer.title, load, `  ${offer.muscle} is owed ${String(offer.owed)} more this week`]
  if (offer.atKitCeiling)
    said.push("  your kit tops out here, so the weight holds and the reps climb")
  if (!offer.familiar) said.push("  this one is new to you")
  return said
}

export function newnessLeftIn(
  done: readonly string[],
  marks: ReadonlyMap<string, Mark>,
  cap: number
): number {
  if (done.length === 0) return 0
  const todayCount = new Map<string, number>()
  for (const one of done) todayCount.set(one, (todayCount.get(one) ?? 0) + 1)
  let fresh = 0
  for (const [slug, count] of todayCount) {
    if ((marks.get(slug)?.sets ?? 0) - count === 0) fresh += 1
  }
  return Math.max(0, cap - fresh)
}

export function nextIn(root: string, today: string): Offer | null {
  const week = weekIn(root, today, selectionPolicy.nearFailureRpeFloor)
  const kit = kitIn(valuesOfType(root, KIT_TYPE).map((one) => one.value))
  const marks = marksIn(week.sets, selectionPolicy.nearFailureRpeFloor, today)
  const done = doneOn(week.sets, today, selectionPolicy.nearFailureRpeFloor)
  return offerOf(
    week,
    kit,
    marks,
    selectionPolicy.weeklySetFloor,
    selectionPolicy.weeklySetCeiling,
    newnessLeftIn(done, marks, selectionPolicy.noveltyCapPerSession)
  )
}

export function fitnessNext(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json])
  if ("refused" in read) return mistaking(read.refused)
  try {
    const offer = nextIn(given.root, getMountainMorningDayStr(new Date()))
    if (read.taken.json) return told([JSON.stringify(offer)])
    return told([...saidOf(offer)])
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}

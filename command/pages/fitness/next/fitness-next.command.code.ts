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
  coveredBy,
  KIT_TYPE,
  type Kit,
  kitIn,
  loadsFor,
} from "akasha/command/pages/fitness/modules/kit-loading/kit-loading.module.code.ts"
import {
  dayOf,
  type Movement,
  nearFailureIn,
  type TrainingWeek,
  weekIn,
} from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import { fitnessNext as page } from "akasha/command/pages/fitness/next/fitness-next.command.ts"
import {
  DAY_TYPE,
  fitsIn,
  focusOn,
  RESTING,
  weekdayOn,
} from "akasha/command/pages/fitness/next/modules/rotation/rotation.module.code.ts"
import {
  type Step,
  stepFor,
  steppedOf,
} from "akasha/command/pages/fitness/next/modules/stepping/stepping.module.code.ts"
import {
  type Warmth,
  warmthIn,
  warmupFor,
} from "akasha/command/pages/fitness/next/modules/warming/warming.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  numberAt,
  slugAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const RESTRICTION_TYPE = "movement-restriction"

const DECLINE_TYPE = "strength-decline"

const BODY_ONLY = "body-only"

const UNRANKED = ["stretching", "cardio"]

export type Mark = {
  readonly sets: number
  readonly weight: number | null
  readonly reps: number | null
  readonly bestOn: string | null
  readonly lastOn: string | null
  readonly staleBouts: number
  readonly turns: number
}

const NOTHING: Mark = {
  sets: 0,
  weight: null,
  reps: null,
  bestOn: null,
  lastOn: null,
  staleBouts: 0,
  turns: 0,
}

export function depthOf(mark: Mark | undefined): number {
  return (mark?.sets ?? 0) - (mark?.turns ?? 0)
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
  readonly slower: boolean
  readonly step: Step
}

export type Bounds = {
  readonly low: number
  readonly ceiling: number
  readonly newnessLeft: number
  readonly repsCap: number
  readonly warmupShare: number
  readonly warmupReps: number
  readonly raising: number
  readonly raiseSeconds: number
  readonly mobilising: number
  readonly easyReps: number
}

export function restrictedIn(pages: readonly Value[]): ReadonlySet<string> {
  const held = new Set<string>()
  for (const one of pages) {
    const pattern = textAt(one, "movementPattern")
    if (pattern !== null) held.add(pattern)
  }
  return held
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

export function turnsIn(
  pages: readonly Value[],
  before: string
): ReadonlyMap<string, readonly string[]> {
  const held = new Map<string, string[]>()
  for (const one of pages) {
    const on = textAt(one, "declineDate")
    const named = slugAt(one, "exercise")
    if (on === null || named === null || on > before) continue
    const was = held.get(named) ?? []
    was.push(on)
    held.set(named, was)
  }
  return held
}

function staledIn(
  held: ReadonlyMap<string, Mark>,
  days: ReadonlyMap<string, ReadonlySet<string>>,
  turns: ReadonlyMap<string, readonly string[]>
): ReadonlyMap<string, Mark> {
  const done = new Map<string, Mark>()
  for (const [slug, mark] of held) {
    const best = mark.bestOn
    const seen = [...(days.get(slug) ?? [])]
    const after = best === null ? 0 : seen.filter((one) => one > best).length
    done.set(slug, { ...mark, staleBouts: after, turns: (turns.get(slug) ?? []).length })
  }
  for (const [slug, said] of turns) {
    if (!done.has(slug)) done.set(slug, { ...NOTHING, turns: said.length })
  }
  return done
}

export function marksIn(
  sets: readonly Value[],
  nearFailure: number,
  before: string,
  turns: ReadonlyMap<string, readonly string[]> = new Map()
): ReadonlyMap<string, Mark> {
  const days = new Map<string, Set<string>>()
  const held = new Map<string, Mark>()
  for (const one of sets) {
    const on = dayOf(one)
    const named = slugAt(one, "exercise")
    if (on === null || named === null || on > before) continue
    if (!nearFailureIn(one, nearFailure)) continue
    const weight = numberAt(one, "weight")
    const reps = numberAt(one, "reps")
    const was = held.get(named) ?? NOTHING
    const heavier = (weight ?? 0) > (was.weight ?? 0)
    const sameWeight = (weight ?? 0) === (was.weight ?? 0)
    const better = was.bestOn === null || heavier || (sameWeight && (reps ?? 0) > (was.reps ?? 0))
    const seen = days.get(named) ?? new Set<string>()
    seen.add(on)
    days.set(named, seen)
    held.set(named, {
      sets: was.sets + 1,
      weight: better ? weight : was.weight,
      reps: better ? reps : was.reps,
      bestOn: better ? on : was.bestOn,
      lastOn: was.lastOn !== null && was.lastOn > on ? was.lastOn : on,
      staleBouts: 0,
      turns: 0,
    })
  }
  return staledIn(held, days, turns)
}

function movedOn(
  marks: ReadonlyMap<string, Mark>,
  movements: ReadonlyMap<string, Movement>,
  slug: string,
  pattern: string | null,
  since: string
): boolean {
  if (pattern === null) return false
  for (const [other, each] of marks) {
    if (other === slug || each.bestOn === null || each.bestOn <= since) continue
    if (movements.get(other)?.pattern === pattern) return true
  }
  return false
}

export function droppedIn(
  marks: ReadonlyMap<string, Mark>,
  movements: ReadonlyMap<string, Movement>,
  cap: number
): ReadonlySet<string> {
  const held = new Set<string>()
  for (const [slug, mark] of marks) {
    if (mark.staleBouts < cap || mark.lastOn === null) continue
    const pattern = movements.get(slug)?.pattern ?? null
    if (!movedOn(marks, movements, slug, pattern, mark.lastOn)) held.add(slug)
  }
  return held
}

export function outIn(
  movements: ReadonlyMap<string, Movement>,
  restricted: ReadonlySet<string>,
  dropped: ReadonlySet<string>
): ReadonlySet<string> {
  const held = new Set(dropped)
  for (const one of movements.values()) {
    if (one.pattern !== null && restricted.has(one.pattern)) held.add(one.slug)
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
    if (dayOf(one) !== day || !nearFailureIn(one, nearFailure)) continue
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
  bounds: Bounds,
  out: ReadonlySet<string>,
  focus: string | null = null
): Movement | null {
  const able = [...week.movements.values()].filter((one) => {
    if (out.has(one.slug) || !fitsIn(one, focus)) return false
    if (!one.muscles.includes(muscle) || !loadable(one, covered)) return false
    const ceiling = bounds.ceiling
    if (one.muscles.every((each) => (week.tally.muscles.get(each) ?? 0) >= ceiling)) return false
    return (marks.get(one.slug)?.sets ?? 0) > 0 || bounds.newnessLeft > 0
  })
  const sorted = [...able].sort((a, b) => {
    const seen = depthOf(marks.get(b.slug)) - depthOf(marks.get(a.slug))
    return (
      coverage(week, a) - coverage(week, b) ||
      seen ||
      (b.sfr ?? 0) - (a.sfr ?? 0) ||
      a.slug.localeCompare(b.slug)
    )
  })
  return sorted[0] ?? null
}

export function climbOf(
  mark: Mark | null,
  atKitCeiling: boolean,
  cap: number
): { readonly reps: number | null; readonly slower: boolean } {
  const best = mark?.reps ?? null
  if (best === null) return { reps: null, slower: false }
  if (atKitCeiling && best >= cap) return { reps: best, slower: true }
  return { reps: best + 1, slower: false }
}

export function offerOf(
  week: TrainingWeek,
  kit: readonly Kit[],
  marks: ReadonlyMap<string, Mark>,
  bounds: Bounds,
  out: ReadonlySet<string>,
  warmth: Warmth = {
    warm: false,
    ramped: new Set(),
    raised: new Map(),
    turn: 0,
    done: new Set(),
    raisedToday: 0,
  },
  focus: string | null = null
): Offer | null {
  const covered = coveredBy(kit)
  const picks = owedIn(week.tally.muscles, bounds.low).flatMap((muscle) => {
    const one = chosenFor(week, muscle, covered, marks, bounds, out, focus)
    if (one === null) return []
    return [
      {
        muscle,
        one,
        owed: bounds.low - (week.tally.muscles.get(muscle) ?? 0),
        seen: depthOf(marks.get(one.slug)),
      },
    ]
  })
  const best = [...picks].sort(
    (a, b) => b.owed - a.owed || b.seen - a.seen || a.muscle.localeCompare(b.muscle)
  )[0]
  if (best === undefined) return null
  const mark = marks.get(best.one.slug) ?? null
  const loads = best.one.implement === null ? [] : loadsFor(kit, best.one.implement)
  const top = loads.length === 0 ? null : Math.max(...loads)
  const atKitCeiling = mark?.weight != null && top !== null && mark.weight >= top
  const climb = climbOf(mark, atKitCeiling, bounds.repsCap)
  const work = {
    movement: best.one.slug,
    title: best.one.title ?? best.one.slug,
    weight: mark?.weight ?? null,
    reps: climb.reps,
  }
  const warmup = warmupFor(best.one, mark?.weight ?? null, loads, week.movements, {
    warm: warmth.warm,
    ramped: warmth.ramped.has(best.one.slug),
    raising: bounds.raising,
    mobilising: bounds.mobilising,
    share: bounds.warmupShare,
    reps: bounds.warmupReps,
    seconds: bounds.raiseSeconds,
    covered,
    raised: warmth.raised,
    turn: warmth.turn,
    done: warmth.done,
    raisedToday: warmth.raisedToday,
    easyReps: bounds.easyReps,
  })
  return {
    ...work,
    muscle: best.muscle,
    owed: best.owed,
    atKitCeiling,
    familiar: (mark?.sets ?? 0) > 0,
    slower: climb.slower,
    step: stepFor(warmup, work),
  }
}

export function saidOf(offer: Offer | null, resting = false): readonly string[] {
  if (resting) return ["today is a rest day — walk, eat well, and let the week's work settle"]
  if (offer === null) return ["nothing is owed and nothing is loadable — rest is the answer today"]
  const said = [...steppedOf(offer.step)]
  if (offer.step.kind !== "work") return said
  if (offer.slower)
    said.push("  your kit and your reps both top out here, so lower slowly and pause at the bottom")
  else if (offer.atKitCeiling)
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

export type Next = {
  readonly offer: Offer | null
  readonly resting: boolean
}

export function focusIn(root: string, today: string): string | null {
  const weekday = weekdayOn(today)
  if (weekday === null) return null
  return focusOn(
    valuesOfType(root, DAY_TYPE).map((one) => one.value),
    weekday
  )
}

export function nextIn(root: string, now: Date): Next {
  const today = getMountainMorningDayStr(now)
  const focus = focusIn(root, today)
  if (focus === RESTING) return { offer: null, resting: true }
  const week = weekIn(root, today, selectionPolicy.nearFailureRpeFloor)
  const kit = kitIn(valuesOfType(root, KIT_TYPE).map((one) => one.value))
  const turns = turnsIn(
    valuesOfType(root, DECLINE_TYPE).map((one) => one.value),
    today
  )
  const marks = marksIn(week.sets, selectionPolicy.nearFailureRpeFloor, today, turns)
  const done = doneOn(week.sets, today, selectionPolicy.nearFailureRpeFloor)
  const restricted = restrictedIn(valuesOfType(root, RESTRICTION_TYPE).map((one) => one.value))
  const dropped = new Set(droppedIn(marks, week.movements, selectionPolicy.boutsWithoutProgress))
  for (const [slug, said] of turns) if (said.includes(today)) dropped.add(slug)
  const bounds: Bounds = {
    low: selectionPolicy.weeklySetFloor,
    ceiling: selectionPolicy.weeklySetCeiling,
    newnessLeft: newnessLeftIn(done, marks, selectionPolicy.noveltyCapPerSession),
    repsCap: selectionPolicy.repsBeforeSlowing,
    warmupShare: selectionPolicy.warmupLoadShare,
    warmupReps: selectionPolicy.warmupReps,
    raising: selectionPolicy.minutesRaising,
    raiseSeconds: selectionPolicy.secondsPerRaise,
    mobilising: selectionPolicy.mobilisingMovements,
    easyReps: selectionPolicy.repsWarmingUp,
  }
  const out = outIn(week.movements, restricted, dropped)
  const warmth = warmthIn(week.sets, now, selectionPolicy.minutesStayingWarm, today)
  return { offer: offerOf(week, kit, marks, bounds, out, warmth, focus), resting: false }
}

export function fitnessNext(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json])
  if ("refused" in read) return mistaking(read.refused)
  try {
    const next = nextIn(given.root, new Date())
    if (read.taken.json) return told([JSON.stringify(next)])
    return told([...saidOf(next.offer, next.resting)])
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}

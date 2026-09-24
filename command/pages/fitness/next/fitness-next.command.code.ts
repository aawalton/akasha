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
  type Cool,
  cooledOf,
  coolFor,
  takenOn,
  workedOn,
} from "akasha/command/pages/fitness/modules/cooling/cooling.module.code.ts"
import {
  coveredBy,
  KIT_TYPE,
  type Kit,
  kitIn,
  topLoadFor,
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
  depthOf,
  droppedIn,
  type Mark,
  marksIn,
  turnsIn,
} from "akasha/command/pages/fitness/next/modules/marking/marking.module.code.ts"
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
  liftedOn,
  targetOn,
} from "akasha/command/pages/fitness/next/modules/targeting/targeting.module.code.ts"
import {
  type Warmth,
  warmthIn,
  warmupFor,
} from "akasha/command/pages/fitness/next/modules/warming/warming.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  slugAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"

const RESTRICTION_TYPE = "movement-restriction"

const DECLINE_TYPE = "strength-decline"

const BODY_ONLY = "body-only"

const UNRANKED = ["stretching", "cardio"]

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

function doneOn(sets: readonly Value[], day: string, nearFailure: number): readonly string[] {
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
  const top = best.one.implement === null ? null : topLoadFor(kit, best.one.implement)
  const atKitCeiling = mark?.weight != null && top !== null && mark.weight >= top
  const climb = climbOf(mark, atKitCeiling, bounds.repsCap)
  const work = {
    movement: best.one.slug,
    title: best.one.title ?? best.one.slug,
    weight: mark?.weight ?? null,
    reps: climb.reps,
  }
  const warmup = warmupFor(best.one, week.movements, {
    warm: warmth.warm,
    raising: bounds.raising,
    mobilising: bounds.mobilising,
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

export type Next = {
  readonly offer: Offer | null
  readonly resting: boolean
  readonly cooling: boolean
  readonly cool: Cool | null
  readonly lifted: number
  readonly target: number
}

export function saidOf(next: Next): readonly string[] {
  if (next.resting) return ["today is a rest day — walk, eat well, and let the week's work settle"]
  if (next.cooling)
    return [
      `${String(Math.round(next.lifted))} lb moved today, against a target of ${String(Math.round(next.target))} lb — that is the day's work`,
      ...cooledOf(next.cool),
    ]
  const offer = next.offer
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

function focusIn(root: string, today: string): string | null {
  const weekday = weekdayOn(today)
  if (weekday === null) return null
  return focusOn(
    valuesOfType(root, DAY_TYPE).map((one) => one.value),
    weekday
  )
}

const BARE = { offer: null, resting: false, cooling: false, cool: null, lifted: 0, target: 0 }

function cooledFor(week: TrainingWeek, covered: ReadonlySet<string>, today: string): Cool | null {
  return coolFor(week.movements, {
    stretches: selectionPolicy.stretchesCoolingDown,
    seconds: selectionPolicy.secondsHoldingStretch,
    worked: workedOn(week.sets, today, week.movements),
    done: takenOn(week.sets, today),
    covered,
  })
}

function nextIn(root: string, now: Date): Next {
  const today = getMountainMorningDayStr(now)
  const focus = focusIn(root, today)
  if (focus === RESTING) return { ...BARE, resting: true }
  const week = weekIn(root, today, selectionPolicy.nearFailureRpeFloor)
  const kit = kitIn(valuesOfType(root, KIT_TYPE).map((one) => one.value))
  const moved = liftedOn(week.sets, week.movements, alan.bodyweight)
  const lifted = moved.get(today) ?? 0
  const target = targetOn(
    moved,
    {
      seed: selectionPolicy.volumeTargetSeed,
      from: selectionPolicy.volumeTargetFrom,
      rise: selectionPolicy.volumeTargetRise,
      fall: selectionPolicy.volumeTargetFall,
    },
    today
  )
  if (lifted >= target) {
    const covered = coveredBy(kit)
    return { ...BARE, cooling: true, cool: cooledFor(week, covered, today), lifted, target }
  }
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
    raising: selectionPolicy.minutesRaising,
    raiseSeconds: selectionPolicy.secondsPerRaise,
    mobilising: selectionPolicy.mobilisingMovements,
    easyReps: selectionPolicy.repsWarmingUp,
  }
  const out = outIn(week.movements, restricted, dropped)
  const warmth = warmthIn(week.sets, now, selectionPolicy.minutesStayingWarm, today)
  return {
    ...BARE,
    offer: offerOf(week, kit, marks, bounds, out, warmth, focus),
    lifted,
    target,
  }
}

export function fitnessNext(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json])
  if ("refused" in read) return mistaking(read.refused)
  try {
    const next = nextIn(given.root, new Date())
    if (read.taken.json) return told([JSON.stringify(next)])
    return told([...saidOf(next)])
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}

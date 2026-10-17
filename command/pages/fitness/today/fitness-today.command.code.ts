import { openedDayOf } from "akasha/alan/track/daily/modules/day-opening/day-opening.module.code.ts"
import { selectionPolicy } from "akasha/alan/value/health/fitness/selection-policy/pages/selection-policy.selection-policy.ts"
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
  dayOf,
  type Movement,
  weekIn,
} from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import { fitnessToday as page } from "akasha/command/pages/fitness/today/fitness-today.command.ts"
import {
  liftedOn,
  limitOn,
} from "akasha/command/pages/fitness/today/modules/limiting/limiting.module.code.ts"
import {
  DAY_TYPE,
  focusOn,
  weekdayOn,
} from "akasha/command/pages/fitness/today/modules/rotation/rotation.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  AKASHA,
  rootsNamed,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  numberAt,
  slugAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"

export type Logged = {
  readonly movement: string | null
  readonly title: string
  readonly weight: number | null
  readonly reps: number | null
  readonly seconds: number | null
  readonly rpe: number | null
  readonly warmup: boolean
  readonly at: string | null
}

export type Today = {
  readonly day: string
  readonly weekday: string | null
  readonly focus: string | null
  readonly limit: number
  readonly lifted: number
  readonly sets: readonly Logged[]
}

function loggedOf(one: Value, movements: ReadonlyMap<string, Movement>): Logged {
  const movement = slugAt(one, "exercise")
  const known = movement === null ? undefined : movements.get(movement)
  return {
    movement,
    title: known?.title ?? textAt(one, "title") ?? movement ?? "a set",
    weight: numberAt(one, "weight"),
    reps: numberAt(one, "reps"),
    seconds: numberAt(one, "durationSeconds"),
    rpe: numberAt(one, "rpe"),
    warmup: one["isWarmup"] === true,
    at: textAt(one, "setPerformedAt"),
  }
}

export function loggedOn(
  sets: readonly Value[],
  movements: ReadonlyMap<string, Movement>,
  day: string
): readonly Logged[] {
  return sets
    .filter((one) => dayOf(one) === day)
    .map((one) => loggedOf(one, movements))
    .sort((a, b) => (a.at ?? "").localeCompare(b.at ?? "") || a.title.localeCompare(b.title))
}

export function setSaid(one: Logged): string {
  const parts: string[] = []
  if (one.weight !== null && one.weight > 0)
    parts.push(`${String(one.weight)} lb × ${String(one.reps ?? 0)}`)
  else if (one.reps !== null) parts.push(`${String(one.reps)} reps`)
  if (one.seconds !== null) parts.push(`${String(one.seconds)} s`)
  if (one.rpe !== null) parts.push(`RPE ${String(one.rpe)}`)
  if (one.warmup) parts.push("warmup")
  return parts.length === 0 ? `  ${one.title}` : `  ${one.title} — ${parts.join(", ")}`
}

function focusSaid(today: Today): string {
  if (today.focus === null) return `${today.day}, a day no schedule names a focus for`
  return `${today.day}, ${today.weekday ?? "a day"} — ${today.focus}`
}

export function saidOf(today: Today): readonly string[] {
  return [
    focusSaid(today),
    `${String(Math.round(today.lifted))} lb moved of a ${String(Math.round(today.limit))} lb limit`,
    ...(today.sets.length === 0
      ? ["no set is logged today"]
      : ["sets logged today", ...today.sets.map(setSaid)]),
  ]
}

function todayOf(root: string, now: Date): Today {
  const day = openedDayOf(rootsNamed({ [AKASHA]: root }, AKASHA), now)
  const weekday = weekdayOn(day)
  const days = valuesOfType(root, DAY_TYPE).map((one) => one.value)
  const focus = weekday === null ? null : focusOn(days, weekday)
  const week = weekIn(root, day, selectionPolicy.nearFailureRpeFloor)
  const moved = liftedOn(week.sets, week.movements, alan.bodyweight)
  const limit = limitOn(
    moved,
    {
      seed: selectionPolicy.volumeLimitSeed,
      from: selectionPolicy.volumeLimitFrom,
      rise: selectionPolicy.volumeLimitRise,
      fall: selectionPolicy.volumeLimitFall,
      legsFactor: selectionPolicy.legsVolumeLimitFactor,
    },
    days,
    day
  )
  return {
    day,
    weekday,
    focus,
    limit,
    lifted: moved.get(day) ?? 0,
    sets: loggedOn(week.sets, week.movements, day),
  }
}

export function fitnessToday(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json])
  if ("refused" in read) return mistaking(read.refused)
  try {
    const today = todayOf(given.root, new Date())
    if (read.taken.json) return told([JSON.stringify(today)])
    return told([...saidOf(today)])
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}

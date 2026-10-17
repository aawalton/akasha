import { dayAfter } from "akasha/alan/harness/day-boundary/modules/day-string/day-string.module.code.ts"
import { liftedIn } from "akasha/alan/value/health/fitness/strength/modules/lifting/lifting.computed-property-module.code.ts"
import {
  dayOf,
  type Movement,
} from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import {
  focusOn,
  weekdayOn,
} from "akasha/command/pages/fitness/today/modules/rotation/rotation.module.code.ts"
import {
  numberAt,
  slugAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const WEEK_ENDS = "sunday"

const LEGS = "legs"

export type LimitRule = {
  readonly seed: number
  readonly from: string
  readonly rise: number
  readonly fall: number
  readonly legsFactor: number
  readonly legsFactorFrom: string
}

export function liftedOn(
  sets: readonly Value[],
  movements: ReadonlyMap<string, Movement>,
  bodyweight: number
): ReadonlyMap<string, number> {
  const held = new Map<string, number>()
  for (const one of sets) {
    const on = dayOf(one)
    if (on === null) continue
    const named = slugAt(one, "exercise")
    const movement = named === null ? undefined : movements.get(named)
    const moved = liftedIn({
      weight: numberAt(one, "weight") ?? 0,
      implementCount: movement?.implementCount ?? 1,
      loadFactor: movement?.loadFactor ?? 0,
      bodyweight,
      reps: numberAt(one, "reps") ?? 0,
      assisted: movement?.assisted ?? false,
    })
    held.set(on, (held.get(on) ?? 0) + moved)
  }
  return held
}

function factorOn(days: readonly Value[], rule: LimitRule, on: string): number {
  if (on < rule.legsFactorFrom) return 1
  const weekday = weekdayOn(on)
  if (weekday === null) return 1
  return focusOn(days, weekday) === LEGS ? rule.legsFactor : 1
}

function baseLimitOn(
  moved: ReadonlyMap<string, number>,
  rule: LimitRule,
  days: readonly Value[],
  today: string
): number {
  let limit = rule.seed
  let met = false
  let on = rule.from
  while (on < today) {
    if ((moved.get(on) ?? 0) >= limit * factorOn(days, rule, on)) {
      limit += rule.rise
      met = true
    }
    if (weekdayOn(on) === WEEK_ENDS) {
      if (!met) limit -= rule.fall
      met = false
    }
    const next = dayAfter(on)
    if (next <= on) break
    on = next
  }
  return Math.max(rule.rise, limit)
}

export function limitOn(
  moved: ReadonlyMap<string, number>,
  rule: LimitRule,
  days: readonly Value[],
  today: string
): number {
  return baseLimitOn(moved, rule, days, today) * factorOn(days, rule, today)
}

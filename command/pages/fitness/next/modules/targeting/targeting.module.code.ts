import { dayAfter } from "akasha/alan/harness/day-boundary/modules/day-string/day-string.module.code.ts"
import { liftedIn } from "akasha/alan/value/health/fitness/strength/modules/lifting/lifting.computed-property-module.code.ts"
import {
  dayOf,
  type Movement,
} from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import { weekdayOn } from "akasha/command/pages/fitness/next/modules/rotation/rotation.module.code.ts"
import {
  numberAt,
  slugAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const WEEK_ENDS = "sunday"

export type Aim = {
  readonly seed: number
  readonly from: string
  readonly rise: number
  readonly fall: number
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
    })
    held.set(on, (held.get(on) ?? 0) + moved)
  }
  return held
}

export function targetOn(moved: ReadonlyMap<string, number>, aim: Aim, today: string): number {
  let target = aim.seed
  let met = false
  let on = aim.from
  while (on < today) {
    if ((moved.get(on) ?? 0) >= target) {
      target += aim.rise
      met = true
    }
    if (weekdayOn(on) === WEEK_ENDS) {
      if (!met) target -= aim.fall
      met = false
    }
    const next = dayAfter(on)
    if (next <= on) break
    on = next
  }
  return Math.max(aim.rise, target)
}

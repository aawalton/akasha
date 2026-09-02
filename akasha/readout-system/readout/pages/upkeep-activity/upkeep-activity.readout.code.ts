import { type Asking, rowFor } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const DAY = "daily-tracking"

const ACTIVE_CALORIES = "active-calories"

const STRENGTH_VOLUME = "strength-volume"

const DATE = "date"

export const POUNDS_TO_THE_CALORIE = 7

const ACTIVITY_UNKNOWN =
  "the tracking day could not be read, so the activity is unknown rather than nothing"

export function trackingOn(day: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": DAY,
    where: { [DATE]: { is: day } },
    keys: [ACTIVE_CALORIES, STRENGTH_VOLUME],
    limit: 1,
  }
}

export function heldNothing(values: Readonly<Record<string, unknown>>): boolean {
  return statedAt(values[ACTIVE_CALORIES]) === null && statedAt(values[STRENGTH_VOLUME]) === null
}

export function activityIn(values: Readonly<Record<string, unknown>>): number | null {
  if (heldNothing(values)) return null
  const moved = statedAt(values[ACTIVE_CALORIES]) ?? 0
  const lifted = statedAt(values[STRENGTH_VOLUME])
  return moved + (lifted === null ? 0 : lifted / POUNDS_TO_THE_CALORIE)
}

export async function fetchActivityCalories(ask: Asking, day: string): Promise<number | null> {
  const row = await rowFor(ask, trackingOn(day), ACTIVITY_UNKNOWN)
  return row === null ? null : activityIn(row.values)
}

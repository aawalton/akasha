import { landAkashaDayPage } from "akasha/alan/track/daily/modules/akasha-day/akasha-day.module.code.ts"
import type { Landed } from "akasha/alan/track/daily/modules/day-narrow-types/day-narrow-types.module.code.ts"
import { dataError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import {
  AKASHA as AKASHA_REPO,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

export const DAILY_TRACKING = "daily-tracking"

export const AKASHA = "akasha"

export type DayPlace = typeof AKASHA

export type DayAct = "write" | "patch"

export function dayPlaceOf(_dayStr: string): DayPlace {
  return AKASHA
}

export function dayNameIn(_place: DayPlace, dayStr: string): string {
  return `day-${dayStr}`
}

export function dayNameOf(dayStr: string): string {
  return dayNameIn(dayPlaceOf(dayStr), dayStr)
}

export interface DayLanding {
  readonly place: DayPlace
  readonly act: string
  readonly pageType: string
  readonly name: string
}

export function dayPageAt(place: DayPlace, act: DayAct, dayStr: string): DayLanding {
  return { place, act, pageType: DAILY_TRACKING, name: dayNameIn(place, dayStr) }
}

export function landDayPage(
  act: DayAct,
  dayStr: string,
  values: Readonly<Record<string, unknown>>,
  writer: string
): Promise<Landed> {
  const at = dayPageAt(dayPlaceOf(dayStr), act, dayStr)
  return landAkashaDayPage(act, at.name, values, writer)
}

export const DAY_PAGE_TYPE = "day"

export function checkoutRoot(): string {
  const root = rootFor(resolveRoots(), AKASHA_REPO)
  if (root === "") {
    throw dataError("no akasha checkout stands here, so no stretch of Alan's day can be read")
  }
  return root
}

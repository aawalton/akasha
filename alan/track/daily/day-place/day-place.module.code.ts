import { AKASHA as AKASHA_REPO, resolveRoots, rootFor } from "@akasha/pages/checkout-roots"
import { dataError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { landAkashaDayPage, landAkashaSessionRow } from "../akasha-day/akasha-day.module.code.ts"
import type { Landed } from "../day-narrow-types/day-narrow-types.module.code.ts"

export const DAILY_TRACKING = "daily-tracking"

export const SESSION_TRACKING = "session-tracking"

export const AKASHA = "akasha"

export type DayPlace = typeof AKASHA

export type DayAct = "write" | "patch"

export type SessionAct = "write-row" | "patch-row" | "remove-row"

export function dayPlaceOf(_dayStr: string): DayPlace {
  return AKASHA
}

export function dayNameIn(_place: DayPlace, dayStr: string): string {
  return `day-${dayStr}`
}

export function dayNameOf(dayStr: string): string {
  return dayNameIn(dayPlaceOf(dayStr), dayStr)
}

export function dayOfName(name: string): string {
  return name.startsWith("day-") ? name.slice("day-".length) : name
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

export function sessionRowAt(place: DayPlace, act: SessionAct, dayStr: string): DayLanding {
  return { place, act, pageType: SESSION_TRACKING, name: dayNameIn(place, dayStr) }
}

export function derivedDayIn(_place: DayPlace, _dayStr: string): undefined {
  return undefined
}

export function derivedDayOf(dayStr: string): undefined {
  return derivedDayIn(dayPlaceOf(dayStr), dayStr)
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

export function landSessionRow(
  act: "write-row" | "patch-row",
  dayStr: string,
  values: Readonly<Record<string, unknown>>,
  writer: string
): Promise<Landed> {
  const at = sessionRowAt(dayPlaceOf(dayStr), act, dayStr)
  const id = values["id"]
  return landAkashaSessionRow(act, at.name, values, typeof id === "string" ? id : "", writer)
}

export function dropSessionRow(dayStr: string, named: string, writer: string): Promise<Landed> {
  const at = sessionRowAt(dayPlaceOf(dayStr), "remove-row", dayStr)
  return landAkashaSessionRow("remove-row", at.name, {}, named, writer)
}

export const DAY_PAGE_TYPE = "day"

export function checkoutRoot(): string {
  const root = rootFor(resolveRoots(), AKASHA_REPO)
  if (root === "") {
    throw dataError("no akasha checkout stands here, so no stretch of Alan's day can be read")
  }
  return root
}

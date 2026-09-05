import { dataError } from "@akasha/errors-core/exit-code"
import { AKASHA as AKASHA_REPO, resolveRoots, rootFor } from "@akasha/pages/checkout-roots"
import { landAkashaDayPage, landAkashaSessionRow } from "../akasha-day/akasha-day.module.code.ts"
import type { Landed } from "../day-narrow-types/day-narrow-types.module.code.ts"

export const DAILY_TRACKING = "daily-tracking"

export const SESSION_TRACKING = "session-tracking"

export const AKASHA = "akasha"

/**
 * The one place a day is kept.
 *
 * This was two places while the markdown half was there. That half is gone, so the union is one
 * member and every reach that used to branch on it goes straight through. What the type still buys
 * is the funnel: a caller that names a place is a caller that asked here.
 */
export type DayPlace = typeof AKASHA

export type DayAct = "write" | "patch"

export type SessionAct = "write-row" | "patch-row" | "remove-row"

/**
 * Which half of the corpus one of Alan's days is kept in.
 *
 * Every reach that writes a day, or writes a session beside a day, asks this first, and nothing
 * reaches the file layer around it. That is the whole point of this file: while the migration was
 * partly done, one day was markdown and the next was akasha, and a reach that decided for itself
 * would write a new day to the old place after that day had already moved — two files for one day,
 * each holding half of it, and nothing saying which is the day.
 *
 * Every day has moved, so this answers `akasha` outright, and no second answer is left for it to
 * give. What stood here until it did was
 * `MIGRATED_DAYS`, a set naming the 133 days already carried across, and a day it did not name was
 * answered `markdown`. That set could only ever be right for the day it was last edited on: it
 * named up to 2026-09-01 while the day being tracked was 2026-09-02, so today's day was written to
 * `pages/daily-tracking/` after every day before it had moved, and the migration that would have
 * carried it over afterwards had already been deleted as dead. Naming one more day would have put
 * the same lag back at the next midnight. A constant is the wrong instrument for a question whose
 * answer changes while nobody is editing this file.
 *
 * The days the set named are in this file's history, and the pages themselves are the record that
 * they moved. `dayStr` is taken and not read, because every caller has a day in hand and asking
 * here is what makes a reach funnelled, whether or not the answer turns on the day.
 */
export function dayPlaceOf(_dayStr: string): DayPlace {
  return AKASHA
}

/**
 * The name a day's page answers to, and the day that name is for.
 *
 * An akasha day is named `wake-day-2026-03-05`, because `20260305` is no identifier and a bare date
 * reads as a number. Both directions live here so that the day a session says it is beside and the
 * day a writer names are read by one rule rather than two.
 */
export function dayNameIn(_place: DayPlace, dayStr: string): string {
  return `wake-day-${dayStr}`
}

export function dayNameOf(dayStr: string): string {
  return dayNameIn(dayPlaceOf(dayStr), dayStr)
}

export function dayOfName(name: string): string {
  return name.startsWith("wake-day-") ? name.slice("wake-day-".length) : name
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

/**
 * A *derived* read of a day, which reaches both halves.
 *
 * `sleepBlocksOn` in tools/lib/wake-day.ts reads day rows and session rows straight off the
 * deriver. It is synchronous, and it is called from inside the page query engine itself
 * (tools/lib/page-query.ts, wherever a query's `where` names `wake-day`), so it cannot await
 * `dayByDate` — the readers below are async and asking one from there would be the engine asking
 * itself. What it could do until the akasha half was read was refuse.
 *
 * It no longer refuses, because the deriver reads both halves. `filedPagesOf` in
 * tools/lib/page-derive.ts reads whichever kind of file a scanned page is, and the `daily-tracking`
 * page type states both places in its `files:`, so a moved day derives its rows where it stands. A
 * day this call was asked about is a day the derive can see, and nothing is left to decide.
 */
export function derivedDayIn(_place: DayPlace, _dayStr: string): void {
  return
}

export function derivedDayOf(dayStr: string): void {
  derivedDayIn(dayPlaceOf(dayStr), dayStr)
}

/**
 * The day page, landed where the day is kept.
 *
 * A day is composed and handed to `akasha tracking`, because nothing writes under `akasha/` but
 * akasha's own verb. The second road here, `pageLanding` into the markdown store, went when that
 * store went, so a day the funnel has never heard of goes where every other day goes.
 */
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

/** The name the page type of one of Alan's days answers to. */
export const WAKE_DAY = "wake-day"

/** The akasha checkout one of Alan's days is read from. */
export function checkoutRoot(): string {
  const root = rootFor(resolveRoots(), AKASHA_REPO)
  if (root === "") {
    throw dataError("no akasha checkout stands here, so no stretch of Alan's day can be read")
  }
  return root
}

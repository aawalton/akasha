import { charismaIn } from "akasha/alan/attribute/pages/charisma/charisma.attribute.code.ts"
import { fetchConstitutionPoints } from "akasha/alan/attribute/pages/constitution/constitution.attribute.code.ts"
import { enduranceIn } from "akasha/alan/attribute/pages/endurance/endurance.attribute.code.ts"
import { intelligenceIn } from "akasha/alan/attribute/pages/intelligence/intelligence.attribute.code.ts"
import { fetchLuckPoints } from "akasha/alan/attribute/pages/luck/luck.attribute.code.ts"
import { strengthIn } from "akasha/alan/attribute/pages/strength/strength.attribute.code.ts"
import { wisdomIn } from "akasha/alan/attribute/pages/wisdom/wisdom.attribute.code.ts"
import {
  CHARISMA_PAGE,
  CONSTITUTION_PAGE,
  ENDURANCE_PAGE,
  INTELLIGENCE_PAGE,
  LUCK_PAGE,
  STRENGTH_PAGE,
  spelledBack,
  type Taken,
  WISDOM_PAGE,
} from "akasha/alan/harness/attribute/modules/attributes-reading/attributes-reading.module.code.ts"
import { askingIn } from "akasha/alan/harness/plant/modules/plants-reading/plants-reading.module.code.ts"
import type { Asking } from "akasha/alan/harness/readout/modules/asking/readout-asking.module.code.ts"
import { openedDayWindow } from "akasha/alan/track/daily/modules/day-opening/day-opening.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { kebabisedRow } from "akasha/page/modules/akasha-page-values/akasha-page-values.module.code.ts"
import {
  AKASHA,
  resolveRoots,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"

const DAY_PAGE_TYPE = "day"

const DATE = "date"

const SESSIONS = "sessions"

const DAY_KEYS = [
  DATE,
  "strengthVolume",
  "activeCalories",
  "wisdomWords",
  "intelligenceTopics",
  SESSIONS,
]

const NO_DAY_TRACKED =
  "no day on or after the day the counting begins is tracked, so the span the entries are counted " +
  "over is unknown rather than empty"

const NO_CHECKOUT =
  "no akasha checkout exists here, so the entries Alan wrote down are unknown rather than none"

const NOTHING_COUNTED = "no day Alan tracked carries what this attribute counts"

export const ATTRIBUTES_COUNTED_FROM = "2026-09-06"

export type Day = Readonly<Record<string, unknown>>

export type Summing = {
  readonly page: string
  readonly pointsOf: (day: Day) => number | null
}

export function charismaOf(day: Day): number | null {
  const held = day[SESSIONS]
  if (!Array.isArray(held)) return null
  return charismaIn(held.map((one) => spelledBack(one as Day)))
}

const OVER_THE_DAYS: readonly Summing[] = [
  { page: STRENGTH_PAGE, pointsOf: strengthIn },
  { page: ENDURANCE_PAGE, pointsOf: enduranceIn },
  { page: WISDOM_PAGE, pointsOf: wisdomIn },
  { page: INTELLIGENCE_PAGE, pointsOf: intelligenceIn },
  { page: CHARISMA_PAGE, pointsOf: charismaOf },
]

export function totalOver(
  days: readonly Day[],
  pointsOf: (day: Day) => number | null
): number | null {
  let held: number | null = null
  for (const day of days) {
    const earned = pointsOf(day)
    if (earned === null) continue
    held = (held ?? 0) + earned
  }
  return held
}

export function daysCounted(days: readonly Day[], before?: string): readonly Day[] {
  const counted = days.filter((day) => String(day[DATE] ?? "") >= ATTRIBUTES_COUNTED_FROM)
  if (before === undefined) return counted
  return counted.filter((day) => String(day[DATE] ?? "") < before)
}

function daysTracked(root: string): readonly Day[] {
  const asked = asking(root, { pageTypeSlug: DAY_PAGE_TYPE, keys: DAY_KEYS } as never)
  if ("refused" in asked) {
    throw new Error(
      `the days Alan tracked could not be read, so every total is unknown rather than zero: ${asked.refused}`
    )
  }
  const days = asked.rows.map((one) => kebabisedRow(one as Day))
  days.sort((one, two) => String(one[DATE] ?? "").localeCompare(String(two[DATE] ?? "")))
  return days
}

function spanTracked(days: readonly Day[]): { readonly from: string; readonly to: string } {
  const first = days[0]
  const last = days[days.length - 1]
  if (first === undefined || last === undefined) throw new Error(NO_DAY_TRACKED)
  const here = resolveRoots()
  return {
    from: openedDayWindow(here, String(first[DATE] ?? "")).from,
    to: openedDayWindow(here, String(last[DATE] ?? "")).to,
  }
}

type Fetching = (ask: Asking, from: string, to: string) => Promise<number>

async function entriesOver(days: readonly Day[], fetch: Fetching): Promise<number> {
  const span = spanTracked(days)
  const checkout = resolveRoots()[AKASHA]
  if (checkout === undefined || checkout === "") throw new Error(NO_CHECKOUT)
  return fetch(askingIn(checkout), span.from, span.to)
}

const OVER_THE_SPAN: readonly { readonly page: string; readonly fetch: Fetching }[] = [
  { page: CONSTITUTION_PAGE, fetch: fetchConstitutionPoints },
  { page: LUCK_PAGE, fetch: fetchLuckPoints },
]

export async function totalAttributes(root: string, before?: string): Promise<Taken> {
  const kept: Record<string, number> = {}
  const unread: string[] = []

  let days: readonly Day[]
  try {
    days = daysTracked(root)
  } catch (thrown) {
    for (const summing of OVER_THE_DAYS) unread.push(`${summing.page} — ${saidBy(thrown)}`)
    for (const spanning of OVER_THE_SPAN) unread.push(`${spanning.page} — ${saidBy(thrown)}`)
    return { kept, unread }
  }

  const counted = daysCounted(days, before)

  for (const summing of OVER_THE_DAYS) {
    const total = totalOver(counted, summing.pointsOf)
    if (total === null) unread.push(`${summing.page} — ${NOTHING_COUNTED}`)
    else kept[summing.page] = total
  }

  const spanned = await Promise.allSettled(
    OVER_THE_SPAN.map((spanning) => entriesOver(counted, spanning.fetch))
  )
  for (const [at, spanning] of OVER_THE_SPAN.entries()) {
    const total = spanned[at]
    if (total === undefined) continue
    if (total.status === "fulfilled") kept[spanning.page] = total.value
    else unread.push(`${spanning.page} — ${saidBy(total.reason)}`)
  }

  return { kept, unread }
}

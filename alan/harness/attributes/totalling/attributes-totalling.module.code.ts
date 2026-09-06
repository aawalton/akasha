import { kebabisedRow } from "@akasha/pages/akasha-page-values"
import { AKASHA, resolveRoots } from "@akasha/pages/checkout-roots"
import { asking } from "@akasha/pages-service/asking"
import { charismaIn } from "@akasha/readout-system/attribute-charisma"
import { fetchConstitutionPoints } from "@akasha/readout-system/attribute-constitution"
import { enduranceIn } from "@akasha/readout-system/attribute-endurance"
import { intelligenceIn } from "@akasha/readout-system/attribute-intelligence"
import { strengthIn } from "@akasha/readout-system/attribute-strength"
import { wisdomIn } from "@akasha/readout-system/attribute-wisdom"
import { wakeDayWindow } from "../../../tracking/daily/day-opening/day-opening.module.code.ts"
import { askingIn } from "../../plants/reading/plants-reading.module.code.ts"
import {
  CHARISMA_PAGE,
  CONSTITUTION_PAGE,
  ENDURANCE_PAGE,
  INTELLIGENCE_PAGE,
  STRENGTH_PAGE,
  spelledBack,
  type Taken,
  WISDOM_PAGE,
  whyOf,
} from "../reading/attributes-reading.module.code.ts"

const WAKE_DAY = "wake-day"

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
  "no day is tracked, so the span the plants are counted over is unknown rather than empty"

const NO_CHECKOUT =
  "no akasha checkout exists here, so the plants Alan ate are unknown rather than none"

const NOTHING_COUNTED = "no day Alan tracked carries what this attribute counts"

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

export const OVER_THE_DAYS: readonly Summing[] = [
  { page: STRENGTH_PAGE, pointsOf: strengthIn },
  { page: ENDURANCE_PAGE, pointsOf: enduranceIn },
  { page: WISDOM_PAGE, pointsOf: wisdomIn },
  { page: INTELLIGENCE_PAGE, pointsOf: intelligenceIn },
  { page: CHARISMA_PAGE, pointsOf: charismaOf },
]

// A DAY CARRYING NOTHING FOR AN ATTRIBUTE ADDS NOTHING RATHER THAN ZERO. Points are counted forward
// from the day an attribute begins, so every day before that day answers null, and an attribute no
// day answers for at all stays absent. A sum that started at zero would draw a total Alan has not
// earned, which is the one figure the column must never carry.
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

// EVERY DAY IS READ IN ONE ASK RATHER THAN ONE ASK TO THE DAY. A total spans the whole history, so
// asking day by day would put a hundred and more reads behind a single figure.
export function daysTracked(root: string): readonly Day[] {
  const asked = asking(root, { pageTypeSlug: WAKE_DAY, keys: DAY_KEYS } as never)
  if ("refused" in asked) {
    throw new Error(
      `the days Alan tracked could not be read, so every total is unknown rather than zero: ${asked.refused}`
    )
  }
  const days = asked.rows.map((one) => kebabisedRow(one as Day))
  days.sort((one, two) => String(one[DATE] ?? "").localeCompare(String(two[DATE] ?? "")))
  return days
}

// THE PLANTS ARE COUNTED OVER ONE SPAN RATHER THAN DAY BY DAY. A food entry states the instant it
// happened at rather than the day it belongs to, and the wake days run end to end, so a span from
// the first day's opening to the last day's close holds each entry exactly once.
export function spanTracked(days: readonly Day[]): { readonly from: string; readonly to: string } {
  const first = days[0]
  const last = days[days.length - 1]
  if (first === undefined || last === undefined) throw new Error(NO_DAY_TRACKED)
  const here = resolveRoots()
  return {
    from: wakeDayWindow(here, String(first[DATE] ?? "")).from,
    to: wakeDayWindow(here, String(last[DATE] ?? "")).to,
  }
}

async function constitutionOver(days: readonly Day[]): Promise<number> {
  const span = spanTracked(days)
  const checkout = resolveRoots()[AKASHA]
  if (checkout === undefined || checkout === "") throw new Error(NO_CHECKOUT)
  return fetchConstitutionPoints(askingIn(checkout), span.from, span.to)
}

export async function totalAttributes(root: string): Promise<Taken> {
  const kept: Record<string, number> = {}
  const unread: string[] = []

  let days: readonly Day[]
  try {
    days = daysTracked(root)
  } catch (thrown) {
    for (const summing of OVER_THE_DAYS) unread.push(`${summing.page} — ${whyOf(thrown)}`)
    unread.push(`${CONSTITUTION_PAGE} — ${whyOf(thrown)}`)
    return { kept, unread }
  }

  for (const summing of OVER_THE_DAYS) {
    const total = totalOver(days, summing.pointsOf)
    if (total === null) unread.push(`${summing.page} — ${NOTHING_COUNTED}`)
    else kept[summing.page] = total
  }

  const [constitution] = await Promise.allSettled([constitutionOver(days)])
  if (constitution.status === "fulfilled") kept[CONSTITUTION_PAGE] = constitution.value
  else unread.push(`${CONSTITUTION_PAGE} — ${whyOf(constitution.reason)}`)

  return { kept, unread }
}

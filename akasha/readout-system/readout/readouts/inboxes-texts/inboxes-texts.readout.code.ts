import { type Asking, rowFor } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const DAY = "daily-tracking"

const TEXTS = "inbox-texts"

const DATE = "date"

const TEXTS_UNKNOWN =
  "the tracking day could not be read, so the unread texts are unknown rather than none"

export function trackingOn(day: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": DAY,
    where: { [DATE]: { is: day } },
    keys: [TEXTS],
    limit: 1,
  }
}

export function textsIn(values: Readonly<Record<string, unknown>>): number | null {
  return statedAt(values[TEXTS])
}

export async function fetchUnreadTexts(ask: Asking, day: string): Promise<number | null> {
  const row = await rowFor(ask, trackingOn(day), TEXTS_UNKNOWN)
  return row === null ? null : textsIn(row.values)
}

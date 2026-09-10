import { type Asking, rowFor } from "../../asking/readout-asking.module.code.ts"
import { statedAt } from "../../tier/readout-tier.module.code.ts"

const DAY = "day"

const LOWEST = "lowestEmailInboxCount"

const DATE = "date"

const DAY_UNKNOWN =
  "the day could not be read, so how near the inbox came to empty is unknown rather than none"

export type MailAsked = {
  readonly pageTypeSlug: string
  readonly where: Readonly<Record<string, { readonly is: string }>>
  readonly keys: readonly string[]
  readonly limit: number
}

export function mailOn(day: string): MailAsked {
  return {
    pageTypeSlug: DAY,
    where: { [DATE]: { is: day } },
    keys: [LOWEST],
    limit: 1,
  }
}

export function lowestIn(values: Readonly<Record<string, unknown>>): number | null {
  return statedAt(values[LOWEST])
}

export async function fetchLowestInbox(ask: Asking, day: string): Promise<number | null> {
  const row = await rowFor(ask, mailOn(day), DAY_UNKNOWN)
  return row === null ? null : lowestIn(row.values)
}

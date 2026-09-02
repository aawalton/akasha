import { type Asking, rowFor } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const MAIL = "email-entry"

const LOWEST = "lowest-inbox-count"

const DATE = "date"

const MAIL_UNKNOWN =
  "the mail entry could not be read, so how near the inbox came to empty is unknown rather than none"

export function mailOn(day: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": MAIL,
    where: { [DATE]: { is: day } },
    keys: [LOWEST],
    limit: 1,
  }
}

export function lowestIn(values: Readonly<Record<string, unknown>>): number | null {
  return statedAt(values[LOWEST])
}

export async function fetchLowestInbox(ask: Asking, day: string): Promise<number | null> {
  const row = await rowFor(ask, mailOn(day), MAIL_UNKNOWN)
  return row === null ? null : lowestIn(row.values)
}

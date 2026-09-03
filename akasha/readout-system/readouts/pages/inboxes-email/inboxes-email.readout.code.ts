import { type Asking, rowFor } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const MAIL = "email-entry"

const LOWEST = "lowestInboxCount"

const DATE = "date"

const MAIL_UNKNOWN =
  "the mail entry could not be read, so how near the inbox came to empty is unknown rather than none"

/**
 * The question, in the shape the akasha store takes it in.
 *
 * A mail entry is an akasha page, so it names its page type as `pageTypeSlug` and carries its count
 * under the key the page states rather than under the slug the property is filed by.
 */
export type MailAsked = {
  readonly pageTypeSlug: string
  readonly where: Readonly<Record<string, { readonly is: string }>>
  readonly keys: readonly string[]
  readonly limit: number
}

export function mailOn(day: string): MailAsked {
  return {
    pageTypeSlug: MAIL,
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

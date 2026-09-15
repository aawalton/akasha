import { statedAt } from "akasha/alan/harness/readout/modules/tier/readout-tier.module.code.ts"

const DAY = "day"

const LOWEST = "lowestEmailInboxCount"

const DATE = "date"

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

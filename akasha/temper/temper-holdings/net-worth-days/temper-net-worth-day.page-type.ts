import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperHoldingsThing } from "../temper-holdings-thing.page-type.ts"
import type { Snapshots } from "./properties/snapshots.page-property-entry.ts"

export type TemperNetWorthDay = TemperHoldingsThing & {
  snapshots: Snapshots
}

export const temperNetWorthDay = {
  id: "01a05fcb-fd35-7342-9bfa-19326d7b002f",
  pageTypeSlug: "page-type",
  slug: "temper-net-worth-day",
  definition: "one day of readings of what an account was worth",
  pluralSlug: "temper-net-worth-days",
  extendsSlug: "page-type/temper-holdings-thing",
  partSlugs: [
    "number-property/currency-gold-value",
    "number-property/excluded-guild-bank-value",
    "number-property/gold-amount",
    "number-property/item-value",
    "page-property-entry/snapshots",
  ],
  properties: [{ pagePropertySlug: "snapshots", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slug opens with `day-` ahead of the day the readings were taken.",
    },
    {
      invariantKind: "departure",
      statement: "A day is read in UTC.",
    },
  ],
} as const satisfies PageType

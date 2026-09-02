import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Listens } from "../../../eso-daily-tracking/properties/listens.page-property-entry.ts"

export type MusicDay = Page & {
  listens: Listens
}

export const musicDay = {
  id: "01a06240-340f-7000-a7e7-2601aa36e75d",
  pageTypeSlug: "page-type",
  slug: "music-day",
  definition: "one day Alan's listening is counted in",
  pluralSlug: "music-days",
  extendsSlug: "page-type/page",
  partSlugs: ["page-property-entry/listens"],
  properties: [{ pagePropertySlug: "listens", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A music day runs from 6am America/New_York to the next 6am America/New_York.",
    },
    {
      invariantKind: "departure",
      statement: "A music day is slugged by the date alone.",
    },
    {
      invariantKind: "departure",
      statement: "A music day's slug is the year and then the month and then the day.",
    },
    {
      invariantKind: "departure",
      statement: "A hyphen joins each part of a music day's slug to the next.",
    },
    {
      invariantKind: "departure",
      statement: "A day Alan listened to nothing is no music day.",
    },
    {
      invariantKind: "absence",
      statement: "A music day carries nothing beyond its listens.",
    },
  ],
} as const satisfies PageType

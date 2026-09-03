import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"
import type { Date as TrackedDate } from "../wake-days/properties/date.text-property.ts"
import type { LowestInboxCount } from "./properties/lowest-inbox-count.number-property.ts"

export type EmailEntry = Page & {
  title: Title
  date: TrackedDate
  lowestInboxCount?: LowestInboxCount
}

export const emailEntry = {
  id: "01a06828-59d2-784f-844f-e19ca7deff92",
  pageTypeSlug: "page-type",
  slug: "email-entry",
  definition: "how Alan's mail stood over one day",
  pluralSlug: "email-entries",
  extendsSlug: "page-type/page",
  partSlugs: ["number-property/lowest-inbox-count", "text-property/date"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "date", required: true, many: false },
    { pagePropertySlug: "lowest-inbox-count", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every day is written down, whether or not the inbox ever reached empty.",
    },
    {
      invariantKind: "departure",
      statement: "One entry holds one day, and the day the entry is of is the day it names.",
    },
    {
      invariantKind: "departure",
      statement: "The entry is what a readout of the mail inbox is read from.",
    },
    {
      invariantKind: "gap",
      statement:
        "The tracking entry this stands under has yet to move in, so the entry extends a page directly.",
    },
  ],
} as const satisfies PageType

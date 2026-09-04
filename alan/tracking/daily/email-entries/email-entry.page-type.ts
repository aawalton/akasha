import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
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
  extendsSlug: ["page-type/page"],
  partSlugs: ["number-property/lowest-inbox-count"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "date", required: true, many: false },
    { pagePropertySlug: "lowest-inbox-count", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every day is written down.",
    },
    {
      invariantKind: "departure",
      statement: "One entry holds one day.",
    },
    {
      invariantKind: "departure",
      statement: "The day an entry is of is the day the entry names.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is slugged `email-entry-` before the day the entry is of.",
    },
    {
      invariantKind: "departure",
      statement: "No entry is slugged by its day alone.",
    },
    {
      invariantKind: "departure",
      statement: "The entry is what a readout of the mail inbox is read from.",
    },
    {
      invariantKind: "gap",
      statement: "The tracking entry an email entry sits under has yet to move in.",
    },
    {
      invariantKind: "gap",
      statement: "An email entry extends a page directly.",
    },
  ],
} as const satisfies PageType

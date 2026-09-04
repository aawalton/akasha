import type { PageType } from "@akasha/pages-system/page-type"
import type { TrackingEntry } from "../tracking-entries/tracking-entry.page-type.ts"

export type TrackingEntryDate = TrackingEntry

export const trackingEntryDate = {
  id: "01a06827-ec0c-7939-809f-82468d73e2e6",
  pageTypeSlug: "page-type",
  slug: "tracking-entry-date",
  definition: "a tracking entry for something true of a whole day",
  pluralSlug: "tracking-entry-dates",
  extendsSlug: ["page-type/tracking-entry"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A date entry counts to the wake day the entry was written in.",
    },
  ],
} as const satisfies PageType

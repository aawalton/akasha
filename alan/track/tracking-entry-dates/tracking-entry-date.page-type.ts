import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const trackingEntryDate = {
  id: "01a06827-ec0c-7939-809f-82468d73e2e6",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "tracking-entry-date",
  definition: "a tracking entry for something true of a whole day",
  pluralSlug: "tracking-entry-dates",
  extends: ["page-type/tracking-entry"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A date entry counts to the day the entry was written in.",
    },
  ],
  types: "ts",
} as const satisfies PageType

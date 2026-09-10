import type { PageProperty } from "../types/page-properties/page-property.page-type.types.ts"
import type { PageType } from "../types/page-type.page-type.ts"

export type CalendarDateProperty = PageProperty

export const calendarDateProperty = {
  id: "01a063de-2c60-7001-89b5-5efdc8482d83",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "calendar-date-property",
  definition: "a page property with a day",
  pluralSlug: "calendar-date-properties",
  extends: ["page-type/page-property"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day is written as an ISO 8601 calendar day.",
    },
    {
      invariantKind: "absence",
      statement: "A day has no hour.",
    },
    {
      invariantKind: "absence",
      statement: "A day has no zone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A moment within a day is an instant property rather than a calendar date property.",
    },
  ],
} as const satisfies PageType

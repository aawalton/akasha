import type { PageProperty } from "../page-properties/page-property.page-type.ts"
import type { PageType } from "../page-types/page-type.page-type.ts"

export type CalendarTimeProperty = PageProperty

export const calendarTimeProperty = {
  id: "01a06d87-9d4d-7c65-aad0-8a0385b221c6",
  pageTypeSlug: "page-type",
  slug: "calendar-time-property",
  definition: "a page property holding a time of day",
  pluralSlug: "calendar-time-properties",
  extendsSlug: "page-type/page-property",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A time of day is written as an ISO 8601 wall time to the minute.",
    },
    {
      invariantKind: "absence",
      statement: "A time of day carries no day.",
    },
    {
      invariantKind: "absence",
      statement: "A time of day carries no zone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A moment on a stated day is an instant property rather than a calendar time property.",
    },
  ],
} as const satisfies PageType

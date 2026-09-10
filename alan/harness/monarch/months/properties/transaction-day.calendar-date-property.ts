import type { CalendarDateProperty } from "akasha/pages/calendar-date-properties/calendar-date-property.page-type.types.ts"

export const transactionDay = {
  id: "01a0680b-2b00-7001-8c63-5f1a9d4b2102",
  pageTypeSlug: "calendar-date-property",
  type: "calendar-date-property",
  slug: "transaction-day",
  propertySlug: "transaction-day",
  definition: "the day money moved",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A transaction sits beside the month its day falls in.",
    },
  ],
  types: "ts",
} as const satisfies CalendarDateProperty

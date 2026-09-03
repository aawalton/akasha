import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type TransactionDay = string

export const transactionDay = {
  id: "01a0680b-2b00-7001-8c63-5f1a9d4b2102",
  pageTypeSlug: "calendar-date-property",
  slug: "transaction-day",
  propertySlug: "transaction-day",
  definition: "the day money moved",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A transaction stands beside the month its day falls in.",
    },
  ],
} as const satisfies CalendarDateProperty

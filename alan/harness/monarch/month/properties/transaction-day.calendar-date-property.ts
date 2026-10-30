import type { CalendarDateProperty } from "akasha/page/calendar-date-property/calendar-date-property.page-type.types.ts"

export const transactionDay = {
  id: "01a0680b-2b00-7001-8c63-5f1a9d4b2102",
  type: "page-type/calendar-date-property",
  slug: "transaction-day",
  propertySlug: "transaction-day",
  definition: "the day a Monarch transaction happens",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A transaction sits beside the month its day falls in.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:12:37.504Z",
  updatedAt: "2026-10-30T15:42:22.302Z",
} as const satisfies CalendarDateProperty

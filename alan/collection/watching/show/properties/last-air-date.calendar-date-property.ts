import type { CalendarDateProperty } from "akasha/page/calendar-date-property/calendar-date-property.page-type.types.ts"

export const lastAirDate = {
  id: "01a06599-ee09-700d-9b99-fd8bc2af90cc",
  type: "page-type/calendar-date-property",
  slug: "last-air-date",
  propertySlug: "last-air-date",
  definition: "the day a show's last episode aired",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A show still running states no day its last episode aired.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T04:49:41.897Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies CalendarDateProperty

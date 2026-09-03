import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type LastAirDate = string

export const lastAirDate = {
  id: "01a06599-ee09-700d-9b99-fd8bc2af90cc",
  pageTypeSlug: "calendar-date-property",
  slug: "last-air-date",
  propertySlug: "last-air-date",
  definition: "the day a show's last episode aired",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A show still running states no day its last episode aired.",
    },
  ],
} as const satisfies CalendarDateProperty

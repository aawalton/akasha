import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type MobilityReadingDate = string

export const mobilityReadingDate = {
  id: "01a06558-36e9-795f-bf57-2d90cf124799",
  pageTypeSlug: "calendar-date-property",
  slug: "mobility-reading-date",
  propertySlug: "mobility-reading-date",
  definition: "the day the reading was taken",
} as const satisfies CalendarDateProperty

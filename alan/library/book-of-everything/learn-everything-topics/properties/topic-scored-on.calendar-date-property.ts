import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type TopicScoredOn = string

export const topicScoredOn = {
  id: "01a0659f-93da-7005-b11f-60f797d029d6",
  pageTypeSlug: "calendar-date-property",
  slug: "topic-scored-on",
  propertySlug: "scored-on",
  definition: "the day a topic was last scored",
} as const satisfies CalendarDateProperty

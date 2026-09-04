import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ScheduleSlug = Slug

export const scheduleSlug = {
  id: "01a0657a-e62d-7c13-84f5-f3c757eeb7c6",
  pageTypeSlug: "relation-property",
  slug: "schedule-slug",
  propertySlug: "schedule-slug",
  definition: "the schedule this day belongs to",
  targetPageTypeSlug: "page-type/workout-schedule",
} as const satisfies RelationProperty

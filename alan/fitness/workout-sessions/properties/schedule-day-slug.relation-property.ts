import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ScheduleDaySlug = Slug

export const scheduleDaySlug = {
  id: "01a06580-5ee5-72c5-a8af-b88086b40948",
  pageTypeSlug: "relation-property",
  slug: "schedule-day-slug",
  propertySlug: "schedule-day-slug",
  definition: "the day of the rotation this session was taken against",
  targetPageTypeSlug: "page-type/schedule-day",
} as const satisfies RelationProperty

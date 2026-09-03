import type { TextProperty } from "@akasha/pages-system/text-property"

export type CalendarSourceSyncStatus = string

export const calendarSourceSyncStatus = {
  id: "01a06868-aec4-7458-be2a-f86e0053b4bc",
  pageTypeSlug: "text-property",
  slug: "calendar-source-sync-status",
  propertySlug: "sync-status",
  definition: "whether a source is still read on a pass",
  max: 400,
  nameFormatSlug: null,
} as const satisfies TextProperty

import type { TextProperty } from "@akasha/pages/text-property"

export type CalendarSourceSyncStatus = string

export const calendarSourceSyncStatus = {
  id: "01a06868-aec4-7458-be2a-f86e0053b4bc",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "calendar-source-sync-status",
  propertySlug: "sync-status",
  definition: "whether a source is still read on a pass",
  maxLength: 400,
  nameFormat: null,
} as const satisfies TextProperty

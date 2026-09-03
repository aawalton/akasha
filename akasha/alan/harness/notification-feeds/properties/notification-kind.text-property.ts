import type { TextProperty } from "@akasha/pages-system/text-property"

export type NotificationKind = string

export const notificationKind = {
  id: "01a06861-e7cd-7e83-8908-2e79da801f95",
  pageTypeSlug: "text-property",
  slug: "notification-kind",
  propertySlug: "kind",
  definition: "what sort of thing a notification tells a person",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty

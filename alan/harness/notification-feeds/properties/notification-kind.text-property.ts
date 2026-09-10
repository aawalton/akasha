import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type NotificationKind = string

export const notificationKind = {
  id: "01a06861-e7cd-7e83-8908-2e79da801f95",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "notification-kind",
  propertySlug: "kind",
  definition: "what sort of thing a notification tells a person",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty

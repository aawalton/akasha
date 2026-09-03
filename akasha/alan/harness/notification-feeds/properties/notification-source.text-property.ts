import type { TextProperty } from "@akasha/pages-system/text-property"

export type NotificationSource = string

export const notificationSource = {
  id: "01a06861-e7cd-7e4f-abcb-e800a07e4427",
  pageTypeSlug: "text-property",
  slug: "notification-source",
  propertySlug: "source",
  definition: "what pushed a notification",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty

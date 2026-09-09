import type { TextProperty } from "@akasha/pages/text-property"

export type NotificationSource = string

export const notificationSource = {
  id: "01a06861-e7cd-7e4f-abcb-e800a07e4427",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "notification-source",
  propertySlug: "source",
  definition: "what pushed a notification",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty

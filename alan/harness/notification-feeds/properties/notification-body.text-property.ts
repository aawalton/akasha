import type { TextProperty } from "@akasha/pages/text-property"

export type NotificationBody = string

export const notificationBody = {
  id: "01a06861-e7cd-7f02-b4fd-2b9ffca4ccae",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "notification-body",
  propertySlug: "body",
  definition: "the words under a notification's title",
  maxLength: 1000,
  nameFormat: null,
} as const satisfies TextProperty

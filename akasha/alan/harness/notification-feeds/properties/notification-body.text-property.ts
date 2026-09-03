import type { TextProperty } from "@akasha/pages-system/text-property"

export type NotificationBody = string

export const notificationBody = {
  id: "01a06861-e7cd-7f02-b4fd-2b9ffca4ccae",
  pageTypeSlug: "text-property",
  slug: "notification-body",
  propertySlug: "body",
  definition: "the words under a notification's title",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty

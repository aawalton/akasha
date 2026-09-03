import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type NotificationReadAt = string

export const notificationReadAt = {
  id: "01a06861-e7cd-7fe3-a9c6-2e3986a6cef9",
  pageTypeSlug: "instant-property",
  slug: "notification-read-at",
  propertySlug: "read-at",
  definition: "when the person opened a notification",
} as const satisfies InstantProperty

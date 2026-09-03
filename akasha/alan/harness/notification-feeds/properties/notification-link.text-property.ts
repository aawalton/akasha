import type { TextProperty } from "@akasha/pages-system/text-property"

export type NotificationLink = string

export const notificationLink = {
  id: "01a06861-e7cd-706b-ac2c-b69a84e99e4f",
  pageTypeSlug: "text-property",
  slug: "notification-link",
  propertySlug: "link",
  definition: "where a tap on a notification takes the person",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty

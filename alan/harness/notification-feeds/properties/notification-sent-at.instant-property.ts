import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export type NotificationSentAt = string

export const notificationSentAt = {
  id: "01a06861-e7cd-70b7-9ef2-ed87dbfce25d",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "notification-sent-at",
  propertySlug: "sent-at",
  definition: "when a notification was pushed at the person",
} as const satisfies InstantProperty

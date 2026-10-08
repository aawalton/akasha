import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const notificationSource = {
  id: "01a06861-e7cd-7e4f-abcb-e800a07e4427",
  type: "page-type/text-property",
  slug: "notification-source",
  propertySlug: "source",
  definition: "what pushed a notification",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-03T17:47:21.933Z",
  updatedAt: "2026-09-15T16:24:02.000Z",
} as const satisfies TextProperty

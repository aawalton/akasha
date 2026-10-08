import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const notificationBody = {
  id: "01a06861-e7cd-7f02-b4fd-2b9ffca4ccae",
  type: "page-type/text-property",
  slug: "notification-body",
  propertySlug: "body",
  definition: "the words under a notification's title",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-03T17:47:21.933Z",
  updatedAt: "2026-09-15T16:24:02.000Z",
} as const satisfies TextProperty

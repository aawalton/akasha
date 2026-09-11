import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const notificationBody = {
  id: "01a06861-e7cd-7f02-b4fd-2b9ffca4ccae",
  type: "text-property",
  slug: "notification-body",
  propertySlug: "body",
  definition: "the words under a notification's title",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

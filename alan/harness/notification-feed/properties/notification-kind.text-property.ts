import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const notificationKind = {
  id: "01a06861-e7cd-7e83-8908-2e79da801f95",
  type: "page-type/text-property",
  slug: "notification-kind",
  propertySlug: "kind",
  definition: "the kind of a notification",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-03T17:47:21.933Z",
  updatedAt: "2026-10-30T15:51:21.608Z",
} as const satisfies TextProperty

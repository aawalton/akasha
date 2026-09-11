import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const memberName = {
  id: "01a06838-7a9e-70f2-8639-14c82d25d28a",
  type: "text-property",
  slug: "member-name",
  propertySlug: "member-name",
  definition: "what one member of a list is called",
  maxLength: 60,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

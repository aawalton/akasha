import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const lesson = {
  id: "01a06582-bd62-7222-ae5c-1f8e31015884",
  type: "page-type/text-property",
  slug: "lesson",
  propertySlug: "lesson",
  definition: "what a game teaches",
  maxLength: 500,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

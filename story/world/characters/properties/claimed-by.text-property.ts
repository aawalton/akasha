import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const claimedBy = {
  id: "01a0b6f7-5048-780a-bd77-9dc274bb7d82",
  type: "page-type/text-property",
  slug: "claimed-by",
  propertySlug: "claimed-by",
  definition: "who the story has making a claim",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const warrantyBasic = {
  id: "01a0c544-577f-710d-a7d5-7ce70b866dd1",
  type: "page-type/text-property",
  slug: "warranty-basic",
  propertySlug: "warranty-basic",
  definition: "how long and how far the maker covers the whole car",
  maxLength: 500,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

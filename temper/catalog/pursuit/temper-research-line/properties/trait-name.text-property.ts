import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const traitName = {
  id: "01a0616b-2cdf-7003-9ab6-582d883b8161",
  type: "page-type/text-property",
  slug: "trait-name",
  propertySlug: "trait-name",
  definition: "a researchable trait's name",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

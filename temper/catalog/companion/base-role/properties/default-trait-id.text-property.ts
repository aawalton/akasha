import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const defaultTraitId = {
  id: "01a0df69-212e-7b6e-b55e-832f38fecb59",
  type: "page-type/text-property",
  slug: "default-trait-id",
  propertySlug: "default-trait-id",
  definition: "the trait a new build for a role starts every piece of gear with",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty

import type { TextProperty } from "@akasha/pages-system/text-property"

export type TraitName = string

export const traitName = {
  id: "01a0616b-2cdf-7003-9ab6-582d883b8161",
  pageTypeSlug: "text-property",
  slug: "trait-name",
  propertySlug: "trait-name",
  definition: "the name a researchable trait is shown under",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty

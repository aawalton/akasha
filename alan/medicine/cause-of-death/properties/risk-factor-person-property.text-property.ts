import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const riskFactorPersonProperty = {
  id: "01a183bf-b6a1-7710-a42c-fc9890b9fda3",
  type: "page-type/text-property",
  slug: "risk-factor-person-property",
  propertySlug: "person-property",
  definition: "the property slug of the person property a risk factor reads",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-10-28T18:22:21.854Z",
  updatedAt: "2026-10-28T18:22:21.854Z",
} as const satisfies TextProperty

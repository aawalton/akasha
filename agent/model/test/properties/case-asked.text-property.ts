import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const caseAsked = {
  id: "01a09143-46a2-7724-a00b-8b09746c6af2",
  type: "page-type/text-property",
  slug: "case-asked",
  propertySlug: "asked",
  definition: "what a person writes to an agent before the text a case sends to a model",
  maxLength: 6000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

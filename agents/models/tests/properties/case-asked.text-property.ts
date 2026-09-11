import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const caseAsked = {
  id: "01a09143-46a2-7724-a00b-8b09746c6af2",
  type: "text-property",
  slug: "case-asked",
  propertySlug: "asked",
  definition: "what a case has the person say before the words the case puts to a model",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty

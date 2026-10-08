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
  createdAt: "2026-09-11T16:18:20.450Z",
  updatedAt: "2026-09-25T18:04:26.000Z",
} as const satisfies TextProperty

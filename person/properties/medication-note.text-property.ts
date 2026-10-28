import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const medicationNote = {
  id: "01a183b2-27fb-71b1-8b65-fec8917934da",
  type: "page-type/text-property",
  slug: "medication-note",
  propertySlug: "note",
  definition: "what else is known of how a person takes a medication or supplement",
  maxLength: 300,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-10-28T18:07:33.369Z",
  updatedAt: "2026-10-28T18:07:33.369Z",
} as const satisfies TextProperty

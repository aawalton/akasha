import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type EvidenceNote = string

export const evidenceNote = {
  id: "01a0658b-9f41-712b-bdb4-11fc02b3e328",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "evidence-note",
  propertySlug: "evidence-note",
  definition: "the wording it was placed from, and who placed it",
  maxLength: 500,
  nameFormat: null,
} as const satisfies TextProperty

import type { TextProperty } from "@akasha/pages-system/text-property"

export type EvidenceNote = string

export const evidenceNote = {
  id: "01a0658b-9f41-712b-bdb4-11fc02b3e328",
  pageTypeSlug: "text-property",
  slug: "evidence-note",
  propertySlug: "evidence-note",
  definition: "the wording it was placed from, and who placed it",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty

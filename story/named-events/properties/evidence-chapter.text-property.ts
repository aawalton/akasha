import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type EvidenceChapter = string

export const evidenceChapter = {
  id: "01a0658b-9f41-7ca3-ad51-77900151e9bc",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "evidence-chapter",
  propertySlug: "evidence-chapter",
  definition: "the chapter the wording placing it is in",
  maxLength: 50,
  nameFormat: null,
} as const satisfies TextProperty

import type { TextProperty } from "@akasha/pages-system/text-property"

export type EvidenceChapter = string

export const evidenceChapter = {
  id: "01a0658b-9f41-7ca3-ad51-77900151e9bc",
  pageTypeSlug: "text-property",
  slug: "evidence-chapter",
  propertySlug: "evidence-chapter",
  definition: "the chapter the wording placing it stands in",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty

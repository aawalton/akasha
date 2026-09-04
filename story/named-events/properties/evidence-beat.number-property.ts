import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EvidenceBeat = number

export const evidenceBeat = {
  id: "01a0658b-9f41-7fdc-b27f-1f0abedae455",
  pageTypeSlug: "number-property",
  slug: "evidence-beat",
  propertySlug: "evidence-beat",
  definition: "how far into that chapter the wording stands",
  max: null,
} as const satisfies NumberProperty

import type { NumberProperty } from "@akasha/pages-system/number-property"

export type RecencyWeight = number

export const recencyWeight = {
  id: "01a06865-7f46-733f-b018-00c6d693cdd9",
  pageTypeSlug: "number-property",
  slug: "recency-weight",
  propertySlug: "recency-weight",
  definition: "how much lately doing a movement counts against picking it again",
  max: null,
} as const satisfies NumberProperty

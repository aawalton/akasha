import type { NumberProperty } from "@akasha/pages-system/number-property"

export type AnchorBeat = number

export const anchorBeat = {
  id: "01a0685e-ef8a-7775-9157-e958fd9fd2e5",
  pageTypeSlug: "number-property",
  slug: "anchor-beat",
  propertySlug: "beat",
  definition: "how far into the chapter the dating words stand",
  max: null,
} as const satisfies NumberProperty

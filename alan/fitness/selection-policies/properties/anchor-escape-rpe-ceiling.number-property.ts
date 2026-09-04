import type { NumberProperty } from "@akasha/pages-system/number-property"

export type AnchorEscapeRpeCeiling = number

export const anchorEscapeRpeCeiling = {
  id: "01a06865-7f45-7fbb-90e0-857e7fde6d1a",
  pageTypeSlug: "number-property",
  slug: "anchor-escape-rpe-ceiling",
  propertySlug: "anchor-escape-rpe-ceiling",
  definition: "the effort below which an anchor may leave its block early",
  max: null,
} as const satisfies NumberProperty

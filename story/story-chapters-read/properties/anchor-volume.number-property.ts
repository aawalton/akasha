import type { NumberProperty } from "@akasha/pages-system/number-property"

export type AnchorVolume = number

export const anchorVolume = {
  id: "01a0685e-ef8a-7c9f-83ab-bffc6078bb5e",
  pageTypeSlug: "number-property",
  slug: "anchor-volume",
  propertySlug: "volume",
  definition: "the volume the chapter the dating words stand in belongs to",
  max: null,
} as const satisfies NumberProperty

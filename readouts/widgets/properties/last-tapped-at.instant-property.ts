import type { InstantProperty } from "@akasha/pages/instant-property"

export type LastTappedAt = string

export const lastTappedAt = {
  id: "01a0789e-7d06-7226-b458-b590857e10da",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "last-tapped-at",
  propertySlug: "last-tapped-at",
  definition: "when a widget was last tapped",
} as const satisfies InstantProperty

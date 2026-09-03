import type { NumberProperty } from "@akasha/pages-system/number-property"

export type LoadFactor = number

export const loadFactor = {
  id: "01a0657b-1ad2-7c7b-a824-89db4f814b6e",
  pageTypeSlug: "number-property",
  slug: "load-factor",
  propertySlug: "load-factor",
  definition: "what share of bodyweight the movement carries, for counting volume",
  max: null,
} as const satisfies NumberProperty

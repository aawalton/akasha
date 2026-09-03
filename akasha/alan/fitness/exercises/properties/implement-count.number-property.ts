import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ImplementCount = number

export const implementCount = {
  id: "01a0657b-1ad2-7059-a709-09530aad6eda",
  pageTypeSlug: "number-property",
  slug: "implement-count",
  propertySlug: "implement-count",
  definition: "how many pieces of kit are loaded at once, so a pair of dumbbells counts twice",
  max: null,
} as const satisfies NumberProperty

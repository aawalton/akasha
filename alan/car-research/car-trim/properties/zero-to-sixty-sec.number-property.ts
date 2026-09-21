import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const zeroToSixtySec = {
  id: "01a0c548-3700-7380-a4e2-535812763a6c",
  type: "page-type/number-property",
  slug: "zero-to-sixty-sec",
  propertySlug: "zero-to-sixty-sec",
  definition: "how long the car takes to reach sixty miles an hour, in seconds",
  max: null,
  types: "ts",
} as const satisfies NumberProperty

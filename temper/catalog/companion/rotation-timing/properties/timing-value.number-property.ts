import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const timingValue = {
  id: "01a0dee9-195b-75f4-b0e2-37deb4ef8f73",
  type: "page-type/number-property",
  slug: "timing-value",
  propertySlug: "timing-value",
  definition: "the seconds a companion rotation timing lasts, or the amount it gives each second",
  max: null,
  types: "ts",
} as const satisfies NumberProperty

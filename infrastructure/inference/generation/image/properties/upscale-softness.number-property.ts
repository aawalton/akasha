import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const upscaleSoftness = {
  id: "01a0de80-955e-73ab-b6b4-348491ceea76",
  type: "page-type/number-property",
  slug: "upscale-softness",
  propertySlug: "softness",
  definition: "how much an upscale was asked to soften what it sharpened",
  max: null,
  types: "ts",
} as const satisfies NumberProperty

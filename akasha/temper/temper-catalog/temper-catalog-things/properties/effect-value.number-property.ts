import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EffectValue = number

export const effectValue = {
  id: "01a05fb0-3cec-73aa-81be-f0042d45fb19",
  pageTypeSlug: "number-property",
  slug: "effect-value",
  propertySlug: "value",
  definition: "how far an effect moves the metric the effect names",
  max: null,
} as const satisfies NumberProperty

import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EffectCount = number

export const effectCount = {
  id: "01a06193-6caa-74c2-81bc-6489c5339b9f",
  pageTypeSlug: "number-property",
  slug: "effect-count",
  propertySlug: "count",
  definition: "how many times an effect happens",
  max: null,
} as const satisfies NumberProperty

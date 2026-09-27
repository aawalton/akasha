import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const setBonusScale = {
  id: "01a0e113-0582-77ac-8e2f-d1067a04297e",
  type: "page-type/number-property",
  slug: "set-bonus-scale",
  propertySlug: "set-bonus-scale",
  definition: "what a set piece of this quality counts for when its set's bonuses are scaled",
  max: null,
  types: "ts",
} as const satisfies NumberProperty

import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const threshold = {
  id: "01a06579-e4f7-7121-8179-b21785f74250",
  type: "number-property",
  slug: "threshold",
  propertySlug: "threshold",
  definition: "the number a metric reaches when the achievement is earned",
  max: null,
  types: "ts",
} as const satisfies NumberProperty

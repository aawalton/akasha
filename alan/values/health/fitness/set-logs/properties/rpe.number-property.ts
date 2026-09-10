import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type Rpe = number

export const rpe = {
  id: "01a06580-66fd-729a-b332-da7dc2877c22",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "rpe",
  propertySlug: "rpe",
  definition: "how hard the set felt, on the ten-point scale of perceived exertion",
  max: null,
} as const satisfies NumberProperty

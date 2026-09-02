import type { NumberProperty } from "@akasha/pages-system/number-property"

export type FunPoints = number

export const funPoints = {
  id: "01a05fd8-c30f-71bf-934a-ac50fb4665b1",
  pageTypeSlug: "number-property",
  slug: "fun-points",
  propertySlug: "fun-points",
  definition: "the fun earned on a day",
  max: null,
} as const satisfies NumberProperty

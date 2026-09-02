import type { NumberProperty } from "@akasha/pages-system/number-property"

export type BonusCount = number

export const bonusCount = {
  id: "01a05fd1-d436-7f9e-bfcc-cfbbe3c44331",
  pageTypeSlug: "number-property",
  slug: "bonus-count",
  propertySlug: "count",
  definition: "how many pieces of a set are worn before a bonus is given",
  max: null,
} as const satisfies NumberProperty

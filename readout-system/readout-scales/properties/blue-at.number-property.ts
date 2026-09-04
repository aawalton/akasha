import type { NumberProperty } from "@akasha/pages-system/number-property"

export type BlueAt = number

export const blueAt = {
  id: "01a0544e-f1f5-7f02-8b36-1aa163f0cff3",
  pageTypeSlug: "number-property",
  slug: "blue-at",
  propertySlug: "blue-at",
  definition: "the reading at which a scale turns blue",
  max: null,
} as const satisfies NumberProperty

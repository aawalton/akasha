import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoCraftTypeId = number

export const esoCraftTypeId = {
  id: "01a0616b-2cdf-7000-85c0-2cc1492dd61f",
  pageTypeSlug: "number-property",
  slug: "eso-craft-type-id",
  propertySlug: "eso-craft-type-id",
  definition: "the number The Elder Scrolls Online names a craft by",
  max: null,
} as const satisfies NumberProperty

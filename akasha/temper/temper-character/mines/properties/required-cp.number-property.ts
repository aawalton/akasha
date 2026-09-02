import type { NumberProperty } from "@akasha/pages-system/number-property"

export type RequiredCp = number

export const requiredCp = {
  id: "01a05fcd-f554-7b02-9743-f4c0d2bde176",
  pageTypeSlug: "number-property",
  slug: "required-cp",
  propertySlug: "required-cp",
  definition: "the champion rank an item asks for",
  max: null,
} as const satisfies NumberProperty

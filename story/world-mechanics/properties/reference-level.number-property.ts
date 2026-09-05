import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ReferenceLevel = number

export const referenceLevel = {
  id: "01a06558-a991-791c-9a27-9e3c4cc1aba1",
  pageTypeSlug: "number-property",
  slug: "reference-level",
  propertySlug: "level",
  definition: "the level the text gives at a naming",
  max: null,
} as const satisfies NumberProperty

import type { NumberProperty } from "@akasha/pages-system/number-property"

export type MaxOccurrences = number

export const maxOccurrences = {
  id: "01a06193-6cab-70b7-ab3c-01c5061dbc9e",
  pageTypeSlug: "number-property",
  slug: "max-occurrences",
  propertySlug: "max-occurrences",
  definition: "how many times an effect fires before it stops",
  max: null,
} as const satisfies NumberProperty

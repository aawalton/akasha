import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SkippedCount = number

export const skippedCount = {
  id: "01a06861-f664-71f7-a5a5-fceabced2a58",
  pageTypeSlug: "number-property",
  slug: "skipped-count",
  propertySlug: "skipped-count",
  definition: "how many pages a pull left as they stood",
  max: null,
} as const satisfies NumberProperty

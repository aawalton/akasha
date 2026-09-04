import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type CollectionCompletion = "completed" | "in-progress" | "not-started"

export const collectionCompletion = {
  id: "01a06935-8626-7d9a-9cf5-26f5f7d88df7",
  pageTypeSlug: "formula-property",
  slug: "collection-completion",
  propertySlug: "completion",
  definition: "a collection's progress as a stage rather than an amount",
  holds: "text",
  formula:
    'case({total-length-in-words} > 0 && {total-remaining-in-words} <= 0 -> "completed", {total-progress-in-words} > 0 -> "in-progress", otherwise -> "not-started")',
} as const satisfies FormulaProperty

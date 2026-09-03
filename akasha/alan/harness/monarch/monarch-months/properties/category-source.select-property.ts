import type { SelectProperty } from "@akasha/pages-system/select-property"

export const categorySource = {
  id: "01a0680b-2b00-700a-9c37-6e8b4f2d210b",
  pageTypeSlug: "select-property",
  slug: "category-source",
  propertySlug: "category-source",
  definition: "what settled a transaction's category",
  values: ["monarch", "manual-categorization", "programmatic-categorization"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A source that is not Monarch holds against what Monarch reports.",
    },
    {
      invariantKind: "departure",
      statement: "A transaction stating no source took its category from Monarch untouched.",
    },
  ],
} as const satisfies SelectProperty

export type CategorySource = (typeof categorySource.values)[number]

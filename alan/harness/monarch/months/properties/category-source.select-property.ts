import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const categorySource = {
  id: "01a0680b-2b00-700a-9c37-6e8b4f2d210b",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "category-source",
  propertySlug: "category-source",
  definition: "what settled a transaction's category",
  values: ["monarch", "manual-categorization", "programmatic-categorization"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A source that is not Monarch holds against the category Monarch reports.",
    },
    {
      invariantKind: "departure",
      statement: "A transaction stating no source took its category from Monarch untouched.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty

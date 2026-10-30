import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const categorySource = {
  id: "01a0680b-2b00-700a-9c37-6e8b4f2d210b",
  type: "page-type/select-property",
  slug: "category-source",
  propertySlug: "category-source",
  definition: "how the Monarch category of a Monarch transaction is chosen",
  values: ["monarch", "manual-categorization", "programmatic-categorization"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A source that is not Monarch holds against the category Monarch reports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transaction stating no source took its category from Monarch untouched.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:12:37.504Z",
  updatedAt: "2026-10-30T15:45:46.920Z",
} as const satisfies SelectProperty

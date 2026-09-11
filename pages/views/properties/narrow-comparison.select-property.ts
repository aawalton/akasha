import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const narrowComparison = {
  id: "01a063ee-2a3b-7703-9869-e8ab3280d56f",
  type: "select-property",
  slug: "narrow-comparison",
  propertySlug: "comparison",
  definition: "how one narrow weighs a page's value against what it names",
  values: ["is", "in", "not-in", "has", "contains", "ends-with", "empty", "at-or-after", "before"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A comparison taking one value is given one value.",
    },
    {
      invariantKind: "departure",
      statement:
        "A comparison taking many values is given as many values as that comparison needs.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty

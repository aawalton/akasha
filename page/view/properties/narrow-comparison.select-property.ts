import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const narrowComparison = {
  id: "01a063ee-2a3b-7703-9869-e8ab3280d56f",
  type: "page-type/select-property",
  slug: "narrow-comparison",
  propertySlug: "comparison",
  definition: "how a narrow weighs a page's value against what it names",
  values: [
    "is",
    "in",
    "not-in",
    "has",
    "contains",
    "ends-with",
    "empty",
    "at-or-after",
    "after",
    "before",
    "before-or-empty",
    "at-or-before",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A comparison taking one value is given one value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A comparison taking many values is given as many values as that comparison needs.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T21:02:27.899Z",
  updatedAt: "2026-10-18T16:12:23.664Z",
} as const satisfies SelectProperty

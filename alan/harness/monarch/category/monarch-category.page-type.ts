import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const monarchCategory = {
  id: "01a0680a-1a00-700c-9f28-6e4a7b2d110c",
  type: "page-type/page-type",
  slug: "monarch-category",
  definition: "what a transaction counts as, from groceries to salary",
  extends: ["page-type/monarch-record"],
  parts: ["select-property/category-group-type", "text-property/category-group"],
  properties: [
    { pageProperty: "text-property/category-group", required: false, many: false },
    { pageProperty: "select-property/category-group-type", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A category is partly a choice of budget rather than only a fact about the purchase.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An archived category takes no rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category is named as Monarch titles it.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A category with no group is a category Alan wrote and Monarch never had.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

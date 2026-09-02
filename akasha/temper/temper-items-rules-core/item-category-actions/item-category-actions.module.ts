import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemCategoryActions = {
  id: "01a06100-3bf0-79a0-90a2-4dec665976b8",
  pageTypeSlug: "module",
  slug: "item-category-actions",
  definition:
    "what becomes of each item category, worked out from the rules over the category tree",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A category no rule reaches is left as it was.",
    },
  ],
} as const satisfies Module

import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCategoryTree = {
  id: "01a06103-0617-766d-bdde-4267ab606f55",
  pageTypeSlug: "module",
  slug: "completion-category-tree",
  definition: "every card the completion window shows, under the tab and the parent that holds it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the completion-category pages rather than by hand.",
    },
    {
      invariantKind: "absence",
      statement:
        "The achievement children are hung by `completion-category-tree-composed` rather than here.",
    },
  ],
} as const satisfies Module

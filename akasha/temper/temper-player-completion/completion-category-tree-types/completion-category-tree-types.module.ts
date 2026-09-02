import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCategoryTreeTypes = {
  id: "01a06103-0616-7f27-96d8-71e47e9fde8f",
  pageTypeSlug: "module",
  slug: "completion-category-tree-types",
  definition:
    "the shape of a node in the completion category tree, and the three tabs it hangs under",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module

import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemCategoryTreeUtils = {
  id: "01a0615c-1e10-735d-82f0-7a28eff84e0f",
  pageTypeSlug: "module",
  slug: "item-category-tree-utils",
  definition: "the readings of the item category tree a rule needs of paths, children and kin",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A node's ancestors are the nodes above the node on the path to the root.",
    },
    {
      invariantKind: "departure",
      statement: "A node absent from the tree has no path.",
    },
  ],
} as const satisfies Module

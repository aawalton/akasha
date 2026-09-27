import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryCategoryTree = {
  id: "01a06258-b52a-7a34-8e85-b99f40b1b436",
  type: "page-type/module",
  slug: "inventory-category-tree",
  definition: "the item category tree flattened into nodes keyed by id, with parents and children",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree is written from the branch pages as the addon compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree is built the first time it is asked for, and held after.",
    },
  ],
} as const satisfies Module

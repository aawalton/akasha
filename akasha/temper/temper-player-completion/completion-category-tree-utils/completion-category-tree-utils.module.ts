import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCategoryTreeUtils = {
  id: "01a06408-dd2e-7295-b941-922e331d294e",
  pageTypeSlug: "module",
  slug: "completion-category-tree-utils",
  definition:
    "the readings of the completion card tree a window needs of a node's path and children",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The tree being read arrives as an argument rather than as an imported table.",
    },
    {
      invariantKind: "departure",
      statement: "A path runs from the card down to the node itself.",
    },
    {
      invariantKind: "departure",
      statement: "A node absent from the tree has no path.",
    },
    {
      invariantKind: "departure",
      statement: "A path is looked for under account before characters and before companions.",
    },
    {
      invariantKind: "departure",
      statement:
        "One identifier under two tabs is answered for by the first tab holding that identifier.",
    },
    {
      invariantKind: "departure",
      statement: "Children are asked for under one named tab.",
    },
    {
      invariantKind: "departure",
      statement: "A node the named tab does not hold answers no children.",
    },
    {
      invariantKind: "departure",
      statement: "Naming no node asks for the cards the tab itself holds.",
    },
    {
      invariantKind: "departure",
      statement: "A node is answered in the order the tree holds that node rather than by name.",
    },
  ],
} as const satisfies Module

import type { Module } from "../../code-system/modules/module.page-type.ts"

export const treeDescription = {
  id: "01a081eb-4c68-74d1-b315-5777eb9c2046",
  pageTypeSlug: "module",
  type: "module",
  slug: "tree-description",
  definition: "what a panel says beside its title of how many rows that panel drew",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A panel under no filter says how many rows the panel drew.",
    },
    {
      invariantKind: "departure",
      statement: "One row is said in the singular.",
    },
    {
      invariantKind: "departure",
      statement: "A panel under a filter says how many rows matched of how many were drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A count of nothing matched is a count, so a filter matching none says so.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a tree or a panel.",
    },
  ],
} as const satisfies Module

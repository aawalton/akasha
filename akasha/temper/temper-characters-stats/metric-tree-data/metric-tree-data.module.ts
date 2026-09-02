import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricTreeData = {
  id: "01a06133-5f08-7ca8-bc0d-02aa20d2f63c",
  pageTypeSlug: "module",
  slug: "metric-tree-data",
  definition: "the character stat display tree, seven categories deep down to single stat leaves",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the metric-tree pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "The seven categories are named here in the order the metric-tree pages give.",
    },
    {
      invariantKind: "gap",
      statement:
        "The generator for this table reads a row shape the metric-tree pages no longer carry.",
    },
  ],
} as const satisfies Module

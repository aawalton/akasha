import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricTreeData02 = {
  id: "01a06133-5f07-74ca-9149-2488b2a8aad9",
  pageTypeSlug: "module",
  slug: "metric-tree-data-02",
  definition: "the six character stat display categories that follow damage",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the metric-tree pages rather than by hand.",
    },
  ],
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionMetricTree = {
  id: "01a06152-c2cd-7151-9afb-057ef756a156",
  type: "page-type/module",
  slug: "companion-metric-tree",
  definition: "the fixed grouping of companion metrics into labeled display categories",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The metric grouping is a module-level literal rather than data assembled from metric records.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An empty role list returns the grouping without an Overall group prepended.",
    },
  ],
} as const satisfies Module

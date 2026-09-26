import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionMetricTree = {
  id: "01a06152-c2cd-7151-9afb-057ef756a156",
  type: "page-type/module",
  slug: "companion-metric-tree",
  definition: "the grouping of companion metrics into labeled display categories",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The grouping is read from the stat tree pages under the companion root, in the order they state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group's label is its page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Asking for the grouping before anything has held it is refused.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An empty role list returns the grouping without an Overall group prepended.",
    },
  ],
} as const satisfies Module

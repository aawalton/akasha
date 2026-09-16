import type { GraphAttribute } from "akasha/graph/attribute/graph-attribute.page-type.types.ts"

export type Loading = "at-load" | "deferred"

export const loading = {
  id: "01a0aa6a-cbd1-7703-a107-312755085be9",
  type: "page-type/graph-attribute",
  slug: "loading",
  definition: "whether an edge is followed as the file loads or only later",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge inside a call is followed when that call runs, however late that is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other edge is followed as the file naming it loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A loop closed through a deferred edge alone is no loop at load.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An edge coming in says when that edge is followed.",
    },
  ],
} as const satisfies GraphAttribute

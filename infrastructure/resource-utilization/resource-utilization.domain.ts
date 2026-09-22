import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const resourceUtilization = {
  id: "01a0675b-16f9-7b95-9d7f-cd041a034eab",
  type: "page-type/domain",
  slug: "resource-utilization",
  definition: "how much of each resource akasha runs on is in use rather than idle",
  parts: ["domain/alan-attention"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A resource may itself be an assembly line of other resources.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An assembly line's reading is the highest of its parts' readings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resource is fully utilized once work accumulates in front of that resource.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Work accumulating while busy time reads under full means another resource is the bottleneck.",
    },
  ],
} as const satisfies Domain

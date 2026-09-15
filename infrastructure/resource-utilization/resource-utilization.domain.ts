import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const resourceUtilization = {
  id: "01a0675b-16f9-7b95-9d7f-cd041a034eab",
  type: "page-type/domain",
  slug: "resource-utilization",
  definition: "how much of each resource the system runs on is in use rather than idle",
  parts: ["domain/alan-attention"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resource may itself be an assembly line of other resources.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An assembly line's reading is the highest of its parts' readings.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resource is fully utilized once work accumulates in front of that resource.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Work accumulating while busy time reads under full means another resource is the bottleneck.",
    },
  ],
} as const satisfies Domain

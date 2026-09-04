import type { Domain } from "../../domains/domain.page-type.ts"

export const resourceUtilization = {
  id: "01a0675b-16f9-7b95-9d7f-cd041a034eab",
  pageTypeSlug: "domain",
  slug: "resource-utilization",
  definition: "how much of each resource the system runs on is in use rather than idle",
  partSlugs: ["domain/alan-attention"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A resource may itself be an assembly line of other resources.",
    },
    {
      invariantKind: "departure",
      statement: "An assembly line's reading is the highest of its parts' readings.",
    },
    {
      invariantKind: "departure",
      statement:
        "A resource is fully utilized once work accumulates in front of it, whatever busy time it reports.",
    },
    {
      invariantKind: "departure",
      statement:
        "Work accumulating while busy time reads under full means another resource is the bottleneck.",
    },
  ],
} as const satisfies Domain

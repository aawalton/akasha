import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const alanAttention = {
  id: "01a0675b-16d4-7fec-97b7-58f61da0a03e",
  type: "domain",
  slug: "alan-attention",
  definition: "the time Alan can give the system",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Input Alan sends through Remote Control reaches the agent inside its own process.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No input Alan sends reaches an agent as keystrokes on a terminal.",
    },
  ],
} as const satisfies Domain

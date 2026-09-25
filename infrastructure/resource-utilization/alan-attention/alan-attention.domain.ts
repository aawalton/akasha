import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const alanAttention = {
  id: "01a0675b-16d4-7fec-97b7-58f61da0a03e",
  type: "page-type/domain",
  slug: "alan-attention",
  definition: "the time Alan has for akasha",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Input Alan sends through Remote Control reaches the agent inside its own process.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No input Alan sends reaches an agent as keystrokes on a terminal.",
    },
  ],
} as const satisfies Domain

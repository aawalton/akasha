import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const liveGatewaySeat = {
  id: "01a07c0e-3845-7753-9dd0-c01a2d905a11",
  type: "page-type/module",
  slug: "live-gateway-seat",
  definition: "the seats with a gateway process that still answers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The seats come from the roster present rather than from a list handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat with no gateway process is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ordering and the liveness folding are `module/gateway-seat`'s.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a command line.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module

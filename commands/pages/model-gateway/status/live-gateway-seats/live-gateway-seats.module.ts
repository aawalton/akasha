import type { Module } from "@akasha/code/module"

export const liveGatewaySeats = {
  id: "01a07c0e-3845-7753-9dd0-c01a2d905a11",
  pageTypeSlug: "module",
  slug: "live-gateway-seats",
  definition: "the seats with a gateway process that still answers",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The seats come from the roster present rather than from a list handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with no gateway process is left out.",
    },
    {
      invariantKind: "gap",
      statement: "The ordering and the liveness folding are `agents/proxy-seats`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a command line.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module

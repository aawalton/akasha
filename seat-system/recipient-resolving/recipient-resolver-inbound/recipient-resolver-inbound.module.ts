import type { Module } from "@akasha/code-system/module"

export const recipientResolverInbound = {
  id: "01a0657d-a75e-7002-9ef2-f790d1fe2d24",
  pageTypeSlug: "module",
  slug: "recipient-resolver-inbound",
  definition: "the unclaimed messages waiting on an agent, each read as one comms input",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An agent holding no seat name has nothing waiting.",
    },
    {
      invariantKind: "departure",
      statement: "A message from nobody carries a sender of nothing rather than an empty name.",
    },
  ],
} as const satisfies Module

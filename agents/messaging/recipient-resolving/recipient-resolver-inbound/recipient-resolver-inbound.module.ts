import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const recipientResolverInbound = {
  id: "01a0657d-a75e-7002-9ef2-f790d1fe2d24",
  type: "module",
  slug: "recipient-resolver-inbound",
  definition: "the unclaimed messages waiting on an agent, each read as one comms input",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An agent with no seat name has nothing waiting.",
    },
    {
      invariantKind: "departure",
      statement: "A message from nobody has a sender of nothing rather than an empty name.",
    },
  ],
} as const satisfies Module

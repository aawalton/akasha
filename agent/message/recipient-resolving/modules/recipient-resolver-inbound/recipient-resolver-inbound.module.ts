import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipientResolverInbound = {
  id: "01a0657d-a75e-7002-9ef2-f790d1fe2d24",
  type: "page-type/module",
  slug: "recipient-resolver-inbound",
  definition: "the messages that wait for an agent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent with no seat name has nothing waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message from nobody has a sender of nothing rather than an empty name.",
    },
  ],
} as const satisfies Module

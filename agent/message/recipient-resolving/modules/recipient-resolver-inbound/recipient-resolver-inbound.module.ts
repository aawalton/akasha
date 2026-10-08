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
      statement: "What waits for a seat is read by the seat's name, with or without its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message from nobody has a sender of nothing rather than an empty name.",
    },
  ],
  createdAt: "2026-09-03T04:18:48.798Z",
  updatedAt: "2026-09-28T16:42:01.000Z",
} as const satisfies Module

import type { Module } from "@akasha/code-system/module"

export const recipientResolverRunning = {
  id: "01a0686a-7a57-77d0-b626-30a20097aacc",
  pageTypeSlug: "module",
  slug: "recipient-resolver-running",
  definition: "an absent seat revived when its work arrives",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "It stands outside the fleet it serves.",
    },
    {
      invariantKind: "departure",
      statement: "The armed specs are assembled afresh on every tick rather than fixed at start.",
    },
    {
      invariantKind: "departure",
      statement:
        "The specs are the personas enumerated on the tick together with the handlers named outright.",
    },
    {
      invariantKind: "departure",
      statement: "Each spec's inbound messages are read on every tick.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat is revived only where its page does not stand and inbound work matches it.",
    },
    {
      invariantKind: "departure",
      statement: "What it is configured with is stated when it starts.",
    },
    {
      invariantKind: "departure",
      statement: "A tick that throws is reported and the loop goes on.",
    },
    {
      invariantKind: "departure",
      statement: "It runs until stopped, and a stop ends the loop at its next boundary.",
    },
  ],
} as const satisfies Module

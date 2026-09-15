import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipientResolverRunning = {
  id: "01a0686a-7a57-77d0-b626-30a20097aacc",
  type: "page-type/module",
  slug: "recipient-resolver-running",
  definition: "an absent seat revived when its work arrives",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The recipient resolver sits outside the fleet that resolver serves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The armed specs are assembled afresh on every tick rather than fixed at start.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The specs are the personas enumerated on the tick together with the handlers named outright.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each spec's inbound messages are read on every tick.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat is revived only where its page is not there and inbound work matches that seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The recipient resolver's configuration is stated when that resolver starts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick that throws is reported and the loop goes on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The recipient resolver runs until stopped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop ends the loop at its next boundary.",
    },
  ],
} as const satisfies Module

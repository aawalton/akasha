import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gmailInboundAdapter = {
  id: "01a05c0e-3731-700e-afc0-458bb381fe6a",
  type: "module",
  slug: "gmail-inbound-adapter",
  definition: "one Gmail message read into the shape an arriving email is judged in",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The summary the caller already holds is shaped rather than fetched again.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches Gmail.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whether Alan sent the message is read off the SENT label rather than off the sender.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both the To and the Cc headers are searched for a persona's channel.",
    },
  ],
} as const satisfies Module

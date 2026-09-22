import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gmailInboundAdapter = {
  id: "01a05c0e-3731-700e-afc0-458bb381fe6a",
  type: "page-type/module",
  slug: "gmail-inbound-adapter",
  definition: "a Gmail message turned into the shape judging an arriving email",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The summary the caller already holds is shaped rather than fetched again.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Gmail.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether Alan sent the message is read off the SENT label rather than off the sender.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Both the To and the Cc headers are searched for a persona's channel.",
    },
  ],
} as const satisfies Module

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
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat a sender is handed to is looked up by the sender's bare address.",
    },
  ],
  createdAt: "2026-09-01T08:20:30.641Z",
  updatedAt: "2026-10-25T19:22:27.284Z",
} as const satisfies Module

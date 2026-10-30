import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const imessageRemote = {
  id: "01a05bc9-4308-7005-8e21-1d68ebecb94c",
  type: "page-type/module",
  slug: "imessage-remote",
  definition:
    "how code reads iMessage messages and the address book on the machine that holds the messages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is resolved through the address book before any handle is matched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name matching nobody is a data failure rather than an empty answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address or a number is matched against handles without the address book.",
    },
  ],
  createdAt: "2026-09-01T07:05:11.688Z",
  updatedAt: "2026-10-30T15:33:36.361Z",
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const senderHandlers = {
  id: "01a17482-3af7-7db8-95f2-a83b695ca757",
  type: "page-type/module",
  slug: "sender-handlers",
  definition: "each relationship's email address against the seat its mail is handed to",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A relationship naming no email handler target hands no mail to a seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat a sender's mail is handed to is named for the person the target names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address is lowercased before anything matches a sender against it.",
    },
  ],
  createdAt: "2026-10-25T19:20:54.262Z",
  updatedAt: "2026-10-25T19:20:54.262Z",
} as const satisfies Module

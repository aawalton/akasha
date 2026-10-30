import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gmailMessages = {
  id: "01a05c0e-372f-7750-8af3-82f43929d034",
  type: "page-type/module",
  slug: "gmail-messages",
  definition: "how code handles Gmail messages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing fetches each message's headers one message at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write is named as soon as gmail has taken that write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message sent is named as one that cannot be taken back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reply has the References of the message that reply answers with its own id appended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relabelling that adds and removes nothing is refused.",
    },
  ],
  createdAt: "2026-09-01T08:20:30.639Z",
  updatedAt: "2026-10-30T15:13:18.719Z",
} as const satisfies Module

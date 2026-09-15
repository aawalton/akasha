import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gmailMessages = {
  id: "01a05c0e-372f-7750-8af3-82f43929d034",
  type: "page-type/module",
  slug: "gmail-messages",
  definition: "mail listed, read, sent, relabelled, archived and trashed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A listing fetches each message's headers one message at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write is named as soon as gmail has taken that write.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message sent is named as one that cannot be taken back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A reply has the References of the message that reply answers with its own id appended.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relabelling that adds and removes nothing is refused.",
    },
  ],
} as const satisfies Module

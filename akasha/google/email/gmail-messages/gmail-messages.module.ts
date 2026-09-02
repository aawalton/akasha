import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const gmailMessages = {
  id: "01a05c0e-372f-7750-8af3-82f43929d034",
  pageTypeSlug: "module",
  slug: "gmail-messages",
  definition: "mail listed, read, sent, relabelled, archived and trashed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A listing fetches each message's headers one message at a time.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reply carries the References of what that reply answers with its own id appended.",
    },
    {
      invariantKind: "departure",
      statement: "A relabelling that adds and removes nothing is refused.",
    },
  ],
} as const satisfies Module

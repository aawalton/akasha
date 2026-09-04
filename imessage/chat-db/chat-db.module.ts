import type { Module } from "../../code-system/modules/module.page-type.ts"

export const chatDb = {
  id: "01a05bc9-4308-7004-be2b-a24f942f8823",
  pageTypeSlug: "module",
  slug: "chat-db",
  definition: "the questions asked of the message store and the rows that answer them",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here opens the message store itself.",
    },
    {
      invariantKind: "departure",
      statement: "A message whose text is empty is read from its typedstream body instead.",
    },
    {
      invariantKind: "departure",
      statement: "A row whose message was already read is left out of the answer.",
    },
    {
      invariantKind: "departure",
      statement: "Unread counts only messages carried to Alan's own number within thirty days.",
    },
  ],
} as const satisfies Module

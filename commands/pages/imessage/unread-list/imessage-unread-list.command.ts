import type { Command } from "akasha/commands/command.page-type.types.ts"

export const imessageUnreadList = {
  id: "01a0685f-c8ed-7005-84fd-d9365b175452",
  type: "command",
  slug: "imessage-unread-list",
  definition: "the command giving back the unread messages that came to Alan",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row carries the moment, the sender, and the text.",
    },
    {
      invariantKind: "departure",
      statement: "A named group chat carries its display name before the sender.",
    },
    {
      invariantKind: "departure",
      statement: "Unread counts only messages carried to Alan's own number within thirty days.",
    },
    {
      invariantKind: "departure",
      statement: "Saying no limit answers every unread message rather than a capped list.",
    },
    {
      invariantKind: "departure",
      statement: "A handle no contact names is answered as the handle itself.",
    },
    {
      invariantKind: "departure",
      statement: "The messages are answered oldest first.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here marks a message read.",
    },
  ],
  name: "unread-list",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/limit" },
    { argument: "argument/contact" },
  ],
} as const satisfies Command

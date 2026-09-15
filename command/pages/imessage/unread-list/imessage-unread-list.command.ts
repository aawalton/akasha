import type { Command } from "akasha/command/command.page-type.types.ts"

export const imessageUnreadList = {
  id: "01a0685f-c8ed-7005-84fd-d9365b175452",
  type: "page-type/command",
  slug: "imessage-unread-list",
  definition: "the command giving back the unread messages that came to Alan",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row carries the moment, the sender, and the text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A named group chat carries its display name before the sender.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Unread counts only messages carried to Alan's own number within thirty days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Saying no limit answers every unread message rather than a capped list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A handle no contact names is answered as the handle itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The messages are answered oldest first.",
    },
    {
      decisionKind: "decision-kind/absence",
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

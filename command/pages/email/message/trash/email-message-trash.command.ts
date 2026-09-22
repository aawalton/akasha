import type { Command } from "akasha/command/command.page-type.types.ts"

export const emailMessageTrash = {
  id: "01a06810-cf11-7809-b382-e88022027eb3",
  type: "page-type/command",
  slug: "email-message-trash",
  definition: "the command moving a Gmail message to Trash",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Trashing is a label rather than a delete.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The labels the message has after the change come back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The message's id and its thread come back beside those labels.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trash that threw after Gmail took the change says the message was trashed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here deletes a message for good.",
    },
  ],
  name: "trash",
  arguments: [{ argument: "argument/message", required: true, saidAs: "flag-or-word" }],
} as const satisfies Command

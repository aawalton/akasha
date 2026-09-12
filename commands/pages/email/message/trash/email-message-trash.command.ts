import type { Command } from "akasha/commands/command.page-type.types.ts"

export const emailMessageTrash = {
  id: "01a06810-cf11-7809-b382-e88022027eb3",
  type: "command",
  slug: "email-message-trash",
  definition: "the command moving one Gmail message to Trash",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Trashing is a label rather than a delete.",
    },
    {
      invariantKind: "departure",
      statement: "The labels the message has after the change come back.",
    },
    {
      invariantKind: "departure",
      statement: "The message's id and its thread come back beside those labels.",
    },
    {
      invariantKind: "departure",
      statement: "A trash that threw after Gmail took the change says the message was trashed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here deletes a message for good.",
    },
  ],
  name: "trash",
  arguments: [{ argument: "argument/message", required: true, saidAs: "flag-or-word" }],
} as const satisfies Command

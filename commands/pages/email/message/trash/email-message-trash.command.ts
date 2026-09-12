import type { Command } from "akasha/commands/command.page-type.types.ts"

export const emailMessageTrash = {
  id: "01a06810-cf11-7809-b382-e88022027eb3",
  type: "command",
  slug: "email-message-trash",
  definition: "the command moving one Gmail message to Trash",
  code: "ts",
  taking: [
    { said: "<id>", takes: "the message acted on, said as the id Gmail gives it" },
    { said: "--message <id>", takes: "the message acted on, where no id follows the command" },
  ],
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
      invariantKind: "absence",
      statement: "Nothing here deletes a message for good.",
    },
  ],
  name: "trash",
} as const satisfies Command

import type { Command } from "akasha/commands/command.page-type.types.ts"

export const emailMessageArchive = {
  id: "01a06810-cf11-73ba-92ff-d42a84a458ee",
  type: "command",
  slug: "email-message-archive",
  definition: "the command taking the INBOX label off one Gmail message",
  code: "ts",
  taking: [
    { said: "<id>", takes: "the message acted on, said as the id Gmail gives it" },
    { said: "--message <id>", takes: "the message acted on, where no id follows the command" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Archiving is the INBOX label taken off.",
    },
    {
      invariantKind: "departure",
      statement: "The answer is the labels the message has after the change.",
    },
    {
      invariantKind: "departure",
      statement: "The message's id and its thread come back beside those labels.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the message's body.",
    },
  ],
  name: "archive",
} as const satisfies Command

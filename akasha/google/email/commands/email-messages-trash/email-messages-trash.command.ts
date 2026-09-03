import type { Command } from "@akasha/command-system/command"

export const emailMessagesTrash = {
  id: "01a06810-cf11-7809-b382-e88022027eb3",
  pageTypeSlug: "command",
  slug: "email-messages-trash",
  definition: "the command moving one Gmail message to Trash",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<id>", takes: "the message acted on, said as the id Gmail gives it" },
    { said: "--message <id>", takes: "the message acted on, where no id stands after the command" },
  ],
  helpNotes: [
    "trashing is a label rather than a delete, so taking the TRASH label off brings the message back.",
    "the labels the message carries afterwards come back with its id and its thread.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Trashing is a label rather than a delete.",
    },
    {
      invariantKind: "departure",
      statement: "What comes back is the labels the message carries after the change.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here deletes a message for good.",
    },
  ],
} as const satisfies Command

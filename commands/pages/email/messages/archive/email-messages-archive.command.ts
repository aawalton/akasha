import type { Command } from "../../../../command.page-type.ts"

export const emailMessagesArchive = {
  id: "01a06810-cf11-73ba-92ff-d42a84a458ee",
  pageTypeSlug: "command",
  slug: "email-messages-archive",
  definition: "the command taking the INBOX label off one Gmail message",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "<id>", takes: "the message acted on, said as the id Gmail gives it" },
    { said: "--message <id>", takes: "the message acted on, where no id follows the command" },
  ],
  helpNotes: [
    "archiving is the INBOX label taken off, so the message stays in the mailbox and leaves the inbox.",
    "the labels the message carries afterwards come back with its id and its thread.",
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
      invariantKind: "absence",
      statement: "Nothing here reads the message's body.",
    },
  ],
} as const satisfies Command

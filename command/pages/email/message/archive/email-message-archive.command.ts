import type { Command } from "akasha/command/command.page-type.types.ts"

export const emailMessageArchive = {
  id: "01a06810-cf11-73ba-92ff-d42a84a458ee",
  type: "page-type/command",
  slug: "email-message-archive",
  definition: "the command taking the INBOX label off a Gmail message",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Archiving is the INBOX label taken off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer is the labels the message has after the change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The message's id and its thread come back beside those labels.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An archive that threw after Gmail took the change says the labels changed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the message's body.",
    },
  ],
  name: "archive",
  arguments: [{ argument: "argument/message", required: true, saidAs: "flag-or-word" }],
} as const satisfies Command

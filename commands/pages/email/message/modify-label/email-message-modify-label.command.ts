import type { Command } from "akasha/commands/command.page-type.types.ts"

export const emailMessageModifyLabel = {
  id: "01a06810-cf11-753d-aad0-e13c11000ad2",
  type: "command",
  slug: "email-message-modify-label",
  definition: "the command putting label ids on one Gmail message and taking label ids off it",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The message's id and its thread come back beside those labels.",
    },
    {
      invariantKind: "departure",
      statement: "A relabelling naming neither an addition nor a removal is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A label is named by its id rather than by the name that label is shown under.",
    },
    {
      invariantKind: "departure",
      statement: "The labels the message has after the change come back.",
    },
    {
      invariantKind: "departure",
      statement: "A relabelling that threw after Gmail took the change says the labels changed.",
    },
  ],
  name: "modify-label",
  arguments: [
    { argument: "argument/message", required: true, saidAs: "flag-or-word" },
    { argument: "argument/add-label", repeats: true },
    { argument: "argument/remove-label", repeats: true },
  ],
} as const satisfies Command

import type { Command } from "akasha/command/command.page-type.types.ts"

export const emailMessageModifyLabel = {
  id: "01a06810-cf11-753d-aad0-e13c11000ad2",
  type: "page-type/command",
  slug: "email-message-modify-label",
  definition: "the command putting label ids on a Gmail message and taking label ids off it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The message's id and its thread come back beside those labels.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relabelling naming neither an addition nor a removal is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A label is named by its id rather than by the name that label is shown under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The labels the message has after the change come back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relabelling that threw after Gmail took the change says the labels changed.",
    },
  ],
  name: "modify-label",
  arguments: [
    { argument: "argument/message", required: true, saidAs: "flag-or-word" },
    { argument: "argument/add-label", repeats: true, oneOf: ["argument/remove-label"] },
    { argument: "argument/remove-label", repeats: true, oneOf: ["argument/add-label"] },
  ],
} as const satisfies Command

import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperEsoGenerateSetCarryOver = {
  id: "01a0d8ea-db08-73c9-a4e2-f852b881cb5d",
  type: "page-type/command",
  slug: "temper-eso-generate-set-carry-over",
  definition:
    "the command carrying each set's facts off the sets addon's ported tables onto its page",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The capture is read only for the names the game gives each piece type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run finding any fault refuses with every fault and lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names every item browser row no page states.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "This command runs once and goes once the facts it carries have landed.",
    },
  ],
  name: "set-carry-over",
  arguments: [{ argument: "argument/code-root" }, { argument: "argument/saved-variables-file" }],
} as const satisfies Command

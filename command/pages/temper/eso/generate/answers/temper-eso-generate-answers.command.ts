import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperEsoGenerateAnswers = {
  id: "01a0d42e-c218-7a8e-b751-a43195410e2c",
  type: "page-type/command",
  slug: "temper-eso-generate-answers",
  definition: "the command writing what the running game answered its functions out of its capture",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the call does not name is read from the game's live install.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The answers come from a running game, so no checkout alone can write this table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is written whole rather than mended entry by entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run finding the table already as it should be lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that should have landed and landed nothing refuses rather than answering.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture holding no answers refuses rather than emptying the table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says the API version and how many functions were written.",
    },
  ],
  name: "answers",
  arguments: [{ argument: "argument/code-root" }, { argument: "argument/saved-variables-file" }],
} as const satisfies Command

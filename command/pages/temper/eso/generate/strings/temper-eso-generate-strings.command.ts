import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperEsoGenerateStrings = {
  id: "01a0d418-8dda-7e16-8eab-f943e204c1ee",
  type: "page-type/command",
  slug: "temper-eso-generate-strings",
  definition: "the command writing the text of the game's interface strings out of its own capture",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the call does not name is read from the game's live install.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The text comes from a running game, so no checkout alone can write this table.",
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
      statement: "A capture holding no strings refuses rather than emptying the table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says the API version and how many strings were written.",
    },
  ],
  name: "strings",
  arguments: [{ argument: "argument/code-root" }, { argument: "argument/saved-variables-file" }],
} as const satisfies Command

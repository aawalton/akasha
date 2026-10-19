import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperEsoGenerateColors = {
  id: "01a0d3f9-447a-70e5-a076-3b6713b2e385",
  type: "page-type/command",
  slug: "temper-eso-generate-colors",
  definition: "the command writing the engine's interface colors out of the game's own capture",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The colors are read from the capture landed beside their catalog domain page.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The colors come from a running game, so no checkout alone can write this table.",
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
      statement:
        "No capture landed, or one holding no colors, refuses rather than emptying the table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says the API version and how many types and colors were written.",
    },
  ],
  name: "colors",
  arguments: [{ argument: "argument/code-root" }],
  createdAt: "2026-09-24T15:12:03.706Z",
  updatedAt: "2026-10-19T17:45:15.363Z",
} as const satisfies Command

import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperEsoGenerateAskings = {
  id: "01a0d574-4e8a-7fd5-9540-743b71ebc982",
  type: "page-type/command",
  slug: "temper-eso-generate-askings",
  definition: "the command writing which functions a capture of the character asks",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The documentation read is the `~/esoui` clone's `ESOUIDocumentation.txt`.",
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
      statement:
        "A documentation naming no function a capture asks refuses rather than emptying it.",
    },
  ],
  name: "askings",
  arguments: [{ argument: "argument/code-root" }],
} as const satisfies Command

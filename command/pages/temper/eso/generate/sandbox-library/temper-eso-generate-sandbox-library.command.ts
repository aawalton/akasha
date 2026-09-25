import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperEsoGenerateSandboxLibrary = {
  id: "01a0d8b3-a671-7854-9271-dd368db8e1d7",
  type: "page-type/command",
  slug: "temper-eso-generate-sandbox-library",
  definition:
    "the command writing what the game's Lua sandbox leaves out of the game's own capture",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The first run states the table's data on the table's page as it adds the data.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run finding no table page refuses rather than writing the table alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the call does not name is read from the game's live install.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The sandbox is read in a running game, so no checkout alone can write this table.",
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
      statement: "A capture holding no sandbox refuses rather than emptying the table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sandbox manifest is written again from the table in the same landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says the API version the sandbox was read at.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks the game to collect again.",
    },
  ],
  name: "sandbox-library",
  arguments: [{ argument: "argument/code-root" }, { argument: "argument/saved-variables-file" }],
} as const satisfies Command

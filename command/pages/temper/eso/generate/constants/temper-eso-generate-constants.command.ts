import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperEsoGenerateConstants = {
  id: "01a0cac9-1200-767b-9b5c-42427171acb4",
  type: "page-type/command",
  slug: "temper-eso-generate-constants",
  definition: "the command writing the engine's constant values out of the game's own capture",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the call does not name is read from the game's live install.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The values come from a running game, so no checkout alone can write this table.",
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
      decisionKind: "decision-kind/constraint",
      statement: "The table's file answers to the page beside it, so a plain write moves nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture holding no constants refuses rather than emptying the table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says the API version the values were read at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says how many constants of each kind were written.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks the game to collect again.",
    },
  ],
  name: "constants",
  arguments: [{ argument: "argument/code-root" }, { argument: "argument/saved-variables-file" }],
} as const satisfies Command

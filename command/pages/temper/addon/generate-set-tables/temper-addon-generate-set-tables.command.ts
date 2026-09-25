import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperAddonGenerateSetTables = {
  id: "01a0d8f1-afb4-7788-95c1-1adac8a05602",
  type: "page-type/command",
  slug: "temper-addon-generate-set-tables",
  definition:
    "the command writing the set tables of the sets addon, the item browser and character builds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every table is written from the set pages and nothing else set-specific.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table already holding what the pages say is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No set page found refuses rather than emptying the tables.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the game's capture.",
    },
  ],
  name: "generate-set-tables",
  arguments: [{ argument: "argument/code-root" }],
} as const satisfies Command

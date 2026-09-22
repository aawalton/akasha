import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperCatalogList = {
  id: "01a06034-110c-7dfa-aceb-1292658c99c3",
  type: "page-type/command",
  slug: "temper-catalog-list",
  definition: "the command naming every catalog domain holding the game's reference data",
  code: "ts",
  test: "ts",

  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The domains are read from the keys the catalog addon registers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain is named once.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the game's saved variables.",
    },
  ],
  name: "list",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command

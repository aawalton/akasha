import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperCatalogList = {
  id: "01a06034-110c-7dfa-aceb-1292658c99c3",
  type: "command",
  slug: "temper-catalog-list",
  definition: "the command naming every catalog domain the game's reference data is collected in",
  code: "ts",

  invariants: [
    {
      invariantKind: "departure",
      statement: "The domains are read from the keys the catalog addon registers.",
    },
    {
      invariantKind: "departure",
      statement: "A domain is named once.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the game's saved variables.",
    },
  ],
  name: "list",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command

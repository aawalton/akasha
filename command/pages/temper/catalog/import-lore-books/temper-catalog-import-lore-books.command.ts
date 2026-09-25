import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperCatalogImportLoreBooks = {
  id: "01a0d5e2-67da-76e4-92d6-fa0cd8043288",
  type: "page-type/command",
  slug: "temper-catalog-import-lore-books",
  definition: "the command making a page of each lore book the add-on and completion tables name",
  code: "ts",
  test: "ts",
  parts: ["module/lore-book-planning", "module/lore-book-rows"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The books are read from the tables the LoreBooks add-on and completion hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each collection lands as a change of its own, with the books under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection whose pages already say what this would write lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file of rows any of which states no `id` is written again to be given ids.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection page already there keeps what it holds that this does not write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refused landing ends the run, and the collections before it stay landed.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "This runs once, until the tables it reads are written from the pages it writes.",
    },
  ],
  name: "import-lore-books",
  arguments: [{ argument: "argument/lore-category" }],
} as const satisfies Command

import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperCatalogImportPublicDungeons = {
  id: "01a0d8a1-257f-7e51-8351-9f1f5f74d22c",
  type: "page-type/command",
  slug: "temper-catalog-import-public-dungeons",
  definition: "the command making a page of each public dungeon the skill point sources name",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The public dungeons are read from the skill point sources, and titles from the completion labels.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A public dungeon's slug is its key in lower case, as a group dungeon's is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A public dungeon's display order is where the sources list it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A label whose key is not the key at its place in the sources refuses the run and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A zone key the skill point finder gives no zone id refuses the run and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key named twice refuses the run and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page lands in one change.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "This runs once, until the lists it reads are built from the pages it writes.",
    },
  ],
  name: "import-public-dungeons",
} as const satisfies Command

import type { Command } from "akasha/command/command.page-type.types.ts"

export const gameImport = {
  id: "01a0c65a-cfa9-7275-80af-e128ee193d4c",
  type: "page-type/command",
  slug: "game-import",
  definition: "the command taking a game's rows into the pages of that game's world",
  code: "ts",
  test: "ts",
  parts: [],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is read here because no agent can read a line that long.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page already filed is left as it is, so a second run writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows a game holds are left where they are rather than taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row read from the last file named wins where two rows are one page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No call says which of a game's files to read.",
    },
  ],
  name: "import",
  arguments: [{ argument: "argument/game", required: true }],
} as const satisfies Command

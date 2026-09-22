import type { Command } from "akasha/command/command.page-type.types.ts"

export const gameUnpack = {
  id: "01a0c940-c57c-775a-a7b8-2853a0d22579",
  type: "page-type/command",
  slug: "game-unpack",
  definition: "the command making a page of each row a game keeps in a file beside its page",
  code: "ts",
  test: "ts",
  parts: [],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One row becomes one page, keyed on the name that row was filed under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page made here sits under the game the row belonged to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words a row carried become a file beside the page made of that row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run leaves the rows where they are, and a later change takes them away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rows are named the plural the pages made of them are gathered under.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No run decides anything a second run would decide differently.",
    },
  ],
  name: "unpack",
  arguments: [
    { argument: "argument/game", required: true },
    { argument: "argument/ledger", required: true },
  ],
} as const satisfies Command

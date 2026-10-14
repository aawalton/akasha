import type { Command } from "akasha/command/command.page-type.types.ts"

export const googleSheetTabs = {
  id: "01a13ab3-9ddd-7ebc-9387-e9191638040e",
  type: "page-type/command",
  slug: "google-sheet-tabs",
  definition: "the command answering the tabs a sheet holds, each with its gid and size",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tab is answered on one line, as its title, its gid and its rows and columns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tabs are answered in the order the sheet holds them.",
    },
  ],
  name: "tabs",
  arguments: [
    { argument: "argument/sheet", required: true, saidAs: "flag-or-word" },
    { argument: "argument/json" },
  ],
  createdAt: "2026-10-14T13:56:52.316Z",
  updatedAt: "2026-10-14T13:56:52.316Z",
} as const satisfies Command

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const salesHistoryStatusWindow = {
  id: "01a06197-4c9c-7d54-9cfe-eec960253bbb",
  type: "page-type/module",
  slug: "sales-history-status-window",
  definition: "the window listing every guild and category beside the caching progress",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A list with no rows says so through window-data-state rather than the game's empty row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each row shows its own history loading, so neither list shows a loading state.",
    },
  ],
} as const satisfies Module

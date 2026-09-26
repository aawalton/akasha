import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const salesHistoryDialogs = {
  id: "01a06197-4c92-7915-a2e2-9cec013759d1",
  type: "page-type/module",
  slug: "sales-history-dialogs",
  definition: "the warnings shown before an action that loses cached data",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No warning is shown for a guild's history that has not reached the present.",
    },
  ],
} as const satisfies Module

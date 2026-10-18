import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsSummaryRefresh = {
  id: "01a08871-6a01-7c73-b5a1-f0397f9ff734",
  type: "page-type/module",
  slug: "companions-summary-refresh",
  definition: "filling the companion summary table from live gear or from a saved build",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row colours by how near the worn build is to the target build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A full match is the game's succeeded color, half its contrast gold, less its failed.",
    },
  ],
  createdAt: "2026-09-09T23:12:09.217Z",
  updatedAt: "2026-10-18T17:42:45.390Z",
} as const satisfies Module

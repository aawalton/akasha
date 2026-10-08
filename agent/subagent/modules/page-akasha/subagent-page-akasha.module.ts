import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subagentPageAkasha = {
  id: "01a06983-278f-7ed9-b96e-fe9e2e13c714",
  type: "page-type/module",
  slug: "subagent-page-akasha",
  definition: "where a subagent's akasha page sits, and its removal with the seat above it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sweep of the pages under a seat that was refused answers why those pages did not go.",
    },
  ],
  createdAt: "2026-09-03T23:03:18.159Z",
  updatedAt: "2026-09-22T16:33:18.000Z",
} as const satisfies Module

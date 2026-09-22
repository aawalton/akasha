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
} as const satisfies Module

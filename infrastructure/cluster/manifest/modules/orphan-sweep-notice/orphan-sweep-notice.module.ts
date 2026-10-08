import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const orphanSweepNotice = {
  id: "01a0686c-fd2c-7006-a6f7-7aad69fb8bd6",
  type: "page-type/module",
  slug: "orphan-sweep-notice",
  definition: "what a sweep reading is worth saying to the handler, and in what words",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sweep that found nothing says nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sweep that could not run is a failed run rather than a message saying nothing drifted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every orphan is named with the deploy that manages that orphan.",
    },
  ],
  createdAt: "2026-09-03T17:59:28.300Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module

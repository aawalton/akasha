import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorAgentCleanup = {
  id: "01a0683e-3dbe-7008-b3e4-d8d8c255aa10",
  type: "page-type/module",
  slug: "supervisor-agent-cleanup",
  definition: "how code removes what a supervisor keeps for a seat process when the process ends",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A credential push that does not answer within its bound does not hold up the exit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A per-process config directory is removed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shared config directory is pushed back instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every timer and watch the process took is released before the process is freed.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T14:37:16.538Z",
} as const satisfies Module

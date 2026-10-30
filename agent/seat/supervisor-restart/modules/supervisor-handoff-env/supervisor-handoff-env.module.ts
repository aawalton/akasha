import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorHandoffEnv = {
  id: "01a0683e-3dbe-7023-a794-3a24720e3484",
  type: "page-type/module",
  slug: "supervisor-handoff-env",
  definition: "the values a supervisor sends to its next run",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A handoff missing a single part is ignored rather than half-read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A malformed handoff is said before that handoff is ignored.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A proxy owner absent from the handoff is the session's own agent.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T14:44:26.557Z",
} as const satisfies Module

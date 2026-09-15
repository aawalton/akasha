import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorHandoffEnv = {
  id: "01a0683e-3dbe-7023-a794-3a24720e3484",
  type: "page-type/module",
  slug: "supervisor-handoff-env",
  definition: "what a re-executing supervisor passes to itself through the environment",
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
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorAgentActionTypes = {
  id: "01a0683e-3dbe-7007-9a41-f9ef0fcef896",
  type: "page-type/module",
  slug: "supervisor-agent-action-types",
  definition: "what an action asked of a running seat is",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An action is restart or restart-now or swap-gateway or regret.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A regret names the message it takes back and, once found, where the cut falls.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This module declares no behaviour.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-24T22:00:07.098Z",
} as const satisfies Module

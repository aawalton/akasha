import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorAgentActionArm = {
  id: "01a0683e-3dbe-7005-8bd3-faecca604871",
  type: "page-type/module",
  slug: "supervisor-agent-action-arm",
  definition: "how a supervisor restarts its agent when the agent waits for a message",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A gate already armed is not armed a second time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The child's age is read from its process start rather than counted from arming.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T15:30:28.602Z",
} as const satisfies Module

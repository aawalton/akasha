import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorAgentCreate = {
  id: "01a0683e-3dbe-7009-b4d5-f3784313307e",
  type: "page-type/module",
  slug: "supervisor-agent-create",
  definition: "a newly seated agent's identity",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's identity is a uuid version 7.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spawned agent with no parent is refused rather than seated.",
    },
  ],
} as const satisfies Module

import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorAgentCreate = {
  id: "01a0683e-3dbe-7009-b4d5-f3784313307e",
  type: "page-type/module",
  slug: "supervisor-agent-create",
  definition: "how code makes the id of a new seat",
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
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T14:37:33.103Z",
} as const satisfies Module

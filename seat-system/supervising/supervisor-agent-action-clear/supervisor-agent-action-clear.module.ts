import type { Module } from "@akasha/code-system/module"

export const supervisorAgentActionClear = {
  id: "01a0683e-3dbe-7006-8802-c5cdbe0a8d6d",
  pageTypeSlug: "module",
  slug: "supervisor-agent-action-clear",
  definition: "the requested action taken off a seat before the supervisor signals its child",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A clear that does not answer within its bound stops holding up the signal.",
    },
    {
      invariantKind: "departure",
      statement: "A proxy swap happens only after the request that asked for it is consumed.",
    },
  ],
} as const satisfies Module

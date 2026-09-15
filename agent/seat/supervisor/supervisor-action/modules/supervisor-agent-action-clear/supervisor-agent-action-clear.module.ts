import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorAgentActionClear = {
  id: "01a0683e-3dbe-7006-8802-c5cdbe0a8d6d",
  type: "page-type/module",
  slug: "supervisor-agent-action-clear",
  definition: "the requested action taken off a seat before the supervisor signals its child",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A clear that does not answer within its bound stops holding up the signal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bound is handed in so a test needs no wait.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A proxy swap happens only after the request that asked for that swap is consumed.",
    },
  ],
} as const satisfies Module

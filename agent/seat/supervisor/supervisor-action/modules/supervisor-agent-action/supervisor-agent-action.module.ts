import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorAgentAction = {
  id: "01a0683e-3dbe-7004-8bbe-59a26d9fc3ec",
  type: "module",
  slug: "supervisor-agent-action",
  definition: "a running seat's answer to a restart, a deferred restart or a proxy swap",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restart arms an idle gate rather than signalling the child at once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restart-now clears the request before that restart-now signals the child.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A second proxy swap while a first swap is in flight is dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kill the supervisor issued is remembered so the exit is not read as a crash.",
    },
  ],
} as const satisfies Module

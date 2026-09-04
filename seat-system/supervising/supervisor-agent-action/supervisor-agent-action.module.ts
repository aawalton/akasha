import type { Module } from "@akasha/code-system/module"

export const supervisorAgentAction = {
  id: "01a0683e-3dbe-7004-8bbe-59a26d9fc3ec",
  pageTypeSlug: "module",
  slug: "supervisor-agent-action",
  definition: "a running seat's answer to a restart, a deferred restart or a proxy swap",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A restart arms an idle gate rather than signalling the child at once.",
    },
    {
      invariantKind: "departure",
      statement: "A restart-now clears the request before it signals the child.",
    },
    {
      invariantKind: "departure",
      statement: "A second proxy swap while one is in flight is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A kill the supervisor issued is remembered so the exit is not read as a crash.",
    },
  ],
} as const satisfies Module

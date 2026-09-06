import type { Module } from "@akasha/code/module"

export const supervisorAgentActionTypes = {
  id: "01a0683e-3dbe-7007-9a41-f9ef0fcef896",
  pageTypeSlug: "module",
  slug: "supervisor-agent-action-types",
  definition: "what an action asked of a running seat is",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An action is restart or restart-now or swap-proxy.",
    },
    {
      invariantKind: "absence",
      statement: "This module declares no behaviour.",
    },
  ],
} as const satisfies Module

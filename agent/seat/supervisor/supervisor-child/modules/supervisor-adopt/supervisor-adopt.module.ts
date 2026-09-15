import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorAdopt = {
  id: "01a0683e-3dbe-7001-8d52-13b4652ba83e",
  type: "page-type/module",
  slug: "supervisor-adopt",
  definition: "a Claude child taken over from a prior supervisor or spawned fresh",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A child confirmed dead is not respawned in its place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A child whose liveness cannot be read is recovered with a fresh resuming spawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An inherited child keeps the config file the prior supervisor reconciled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An adopted child is reaped by waiting on its pid rather than by a spawn handle.",
    },
  ],
} as const satisfies Module

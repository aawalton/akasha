import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorAdopt = {
  id: "01a0683e-3dbe-7001-8d52-13b4652ba83e",
  type: "page-type/module",
  slug: "supervisor-adopt",
  definition: "how code keeps the Claude Code process of a seat when a new supervisor starts",
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
      statement: "An adopted child is reaped by waiting on its pid rather than by a spawn handle.",
    },
  ],
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T15:47:18.583Z",
} as const satisfies Module

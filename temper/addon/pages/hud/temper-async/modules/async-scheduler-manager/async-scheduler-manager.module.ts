import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const asyncSchedulerManager = {
  id: "01a0606a-1c57-7e6a-ae00-05ca57435c03",
  type: "page-type/module",
  slug: "async-scheduler-manager",
  definition: "when the scheduler and the frame measurement are switched on and off",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The scheduler runs on a game update at every frame.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The frame measurement runs on a game update every hundred milliseconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scheduler is started again a short delay after the player enters the world.",
    },
  ],
} as const satisfies Module

import type { Module } from "@akasha/code-system/module"

export const asyncSchedulerManager = {
  id: "01a0606a-1c57-7e6a-ae00-05ca57435c03",
  pageTypeSlug: "module",
  slug: "async-scheduler-manager",
  definition: "when the scheduler and the frame measurement are switched on and off",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The scheduler runs on a game update at every frame.",
    },
    {
      invariantKind: "departure",
      statement: "The frame measurement runs on a game update every hundred milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "The scheduler is started again a short delay after the player enters the world.",
    },
  ],
} as const satisfies Module

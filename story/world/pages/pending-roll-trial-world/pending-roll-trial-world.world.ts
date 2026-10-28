import type { World } from "akasha/story/world/world.page-type.types.ts"

export const pendingRollTrialWorld = {
  id: "01a183cf-b828-7819-958b-a62e77d04119",
  type: "page-type/world",
  slug: "pending-roll-trial-world",
  title: "Test World",
  testing: true,
  description:
    "A small world kept for agents testing the engine, and never offered to Alan as a story to play.",
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies World

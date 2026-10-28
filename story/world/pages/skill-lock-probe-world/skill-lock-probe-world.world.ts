import type { World } from "akasha/story/world/world.page-type.types.ts"

export const skillLockProbeWorld = {
  id: "01a17ff2-6f78-7bb0-b781-9519bcaf9bb4",
  type: "page-type/world",
  slug: "skill-lock-probe-world",
  title: "Test World",
  testing: true,
  description:
    "A small world kept for agents testing the engine, and never offered to Alan as a story to play.",
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies World

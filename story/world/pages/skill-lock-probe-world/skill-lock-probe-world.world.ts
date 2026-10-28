import type { World } from "akasha/story/world/world.page-type.types.ts"

export const skillLockProbeWorld = {
  id: "01a17ff8-9a7f-7a1d-9644-374eb39c8447",
  type: "page-type/world",
  slug: "skill-lock-probe-world",
  title: "Test World",
  testing: true,
  description:
    "A small world kept for agents testing the engine, and never offered to Alan as a story to play.",
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies World

import type { World } from "akasha/story/world/world.page-type.types.ts"

export const timeProbeWorld = {
  id: "01a1802d-b13e-748c-aefc-a9d49b4adfef",
  type: "page-type/world",
  slug: "time-probe-world",
  title: "Test World",
  testing: true,
  description:
    "A small world kept for agents testing the engine, and never offered to Alan as a story to play.",
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies World

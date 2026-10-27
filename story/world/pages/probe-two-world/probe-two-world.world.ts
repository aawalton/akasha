import type { World } from "akasha/story/world/world.page-type.types.ts"

export const probeTwoWorld = {
  id: "01a17fbf-aff5-76c6-8038-3a6e6ff6ed4d",
  type: "page-type/world",
  slug: "probe-two-world",
  title: "Test World",
  testing: true,
  description:
    "A small world kept for agents testing the engine, and never offered to Alan as a story to play.",
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies World

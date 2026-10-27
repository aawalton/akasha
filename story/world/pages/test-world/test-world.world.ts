import type { World } from "akasha/story/world/world.page-type.types.ts"

export const testWorld = {
  id: "01a17ec5-127c-7f90-9724-ee9c6dfce6d6",
  type: "page-type/world",
  slug: "test-world",
  title: "Test World",
  description:
    "A small world kept for agents testing the engine, and never offered to Alan as a story to play.",
  createdAt: "2026-10-27T19:10:06.969Z",
  updatedAt: "2026-10-27T19:10:06.969Z",
} as const satisfies World

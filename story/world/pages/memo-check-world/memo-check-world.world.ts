import type { World } from "akasha/story/world/world.page-type.types.ts"

export const memoCheckWorld = {
  id: "01a1832d-38c0-7221-9a91-54e8257f95a1",
  type: "page-type/world",
  slug: "memo-check-world",
  title: "Test World",
  testing: true,
  description:
    "A small world kept for agents testing the engine, and never offered to Alan as a story to play.",
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies World

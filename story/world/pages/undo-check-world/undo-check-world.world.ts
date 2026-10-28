import type { World } from "akasha/story/world/world.page-type.types.ts"

export const undoCheckWorld = {
  id: "01a18309-e114-78e8-8867-9b271373f28a",
  type: "page-type/world",
  slug: "undo-check-world",
  title: "Test World",
  testing: true,
  description:
    "A small world kept for agents testing the engine, and never offered to Alan as a story to play.",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies World

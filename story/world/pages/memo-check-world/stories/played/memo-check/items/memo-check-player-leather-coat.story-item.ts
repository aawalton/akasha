import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const memoCheckPlayerLeatherCoat = {
  id: "01a1832d-38c0-7a0b-b518-4b5e8b68ab04",
  type: "page-type/story-item",
  slug: "memo-check-player-leather-coat",
  title: "Leather Coat",
  world: "world/memo-check-world",
  story: "story-played/memo-check",
  character: "character-player/memo-check-player",
  slot: "item-slot/chest",
  category: "armor",
  description: "A brown leather coat, long enough to cover the knees.",
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies StoryItem

import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const probeTwoPlayerLeatherCoat = {
  id: "01a17fbf-aff5-7fa0-9fee-770f2299316f",
  type: "page-type/story-item",
  slug: "probe-two-player-leather-coat",
  title: "Leather Coat",
  world: "world/probe-two-world",
  story: "story-played/probe-two",
  character: "character-player/probe-two-player",
  slot: "item-slot/chest",
  category: "armor",
  description: "A brown leather coat, long enough to cover the knees.",
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies StoryItem

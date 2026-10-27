import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const probeTwoPlayerIronSword = {
  id: "01a17fbf-aff5-7210-8594-0c565f8bfe8a",
  type: "page-type/story-item",
  slug: "probe-two-player-iron-sword",
  title: "Iron Sword",
  world: "world/probe-two-world",
  story: "story-played/probe-two",
  character: "character-player/probe-two-player",
  slot: "item-slot/main-hand",

  category: "weapon",
  description: "A plain iron sword with a leather grip.",
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies StoryItem

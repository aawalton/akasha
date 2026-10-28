import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const undoCheckPlayerIronSword = {
  id: "01a18309-e114-793b-a94e-737d6586d6f8",
  type: "page-type/story-item",
  slug: "undo-check-player-iron-sword",
  title: "Iron Sword",
  world: "world/undo-check-world",
  story: "story-played/undo-check",
  character: "character-player/undo-check-player",
  slot: "item-slot/main-hand",

  category: "weapon",
  description: "A plain iron sword with a leather grip.",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies StoryItem

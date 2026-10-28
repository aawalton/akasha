import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pathsSheetCheckPlayerIronSword = {
  id: "01a182db-5bf2-7c36-a3be-5d2f6055216f",
  type: "page-type/story-item",
  slug: "paths-sheet-check-player-iron-sword",
  title: "Iron Sword",
  world: "world/paths-sheet-check-world",
  story: "story-played/paths-sheet-check",
  character: "character-player/paths-sheet-check-player",
  slot: "item-slot/main-hand",

  category: "weapon",
  description: "A plain iron sword with a leather grip.",
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies StoryItem

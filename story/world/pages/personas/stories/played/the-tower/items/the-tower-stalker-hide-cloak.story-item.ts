import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerStalkerHideCloak = {
  id: "01a0ca52-9043-70f6-8c3e-4b908fde0651",
  type: "page-type/story-item",
  slug: "the-tower-stalker-hide-cloak",
  title: "Stalker hide cloak",
  story: "story-played/the-tower",
  character: "character-player/the-tower-alan",
  slot: "item-slot/chest",
  description: "A pale stalker hide tied loosely round the neck, uncrafted and loose.",
  category: "armor",
  createdAt: "2026-09-22T18:13:23.651Z",
  updatedAt: "2026-10-27T18:59:43.093Z",
} as const satisfies StoryItem

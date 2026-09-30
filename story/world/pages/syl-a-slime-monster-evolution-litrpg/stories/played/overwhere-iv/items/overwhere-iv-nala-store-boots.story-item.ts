import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaStoreBoots = {
  id: "01a0f1bc-56c8-7d47-bb74-2598ec95682e",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-store-boots",
  title: "Store Boots",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  slot: "item-slot/feet",
  description: "Old leather boots made for a man's feet, rags stuffed in the toes to fit her.",
} as const satisfies StoryItem

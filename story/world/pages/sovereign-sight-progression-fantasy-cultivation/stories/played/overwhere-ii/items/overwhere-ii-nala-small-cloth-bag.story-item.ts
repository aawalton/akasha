import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaSmallClothBag = {
  id: "01a0f3dc-3fa1-7f34-8273-ed0eef429053",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-small-cloth-bag",
  title: "Small Cloth Bag",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  description: "A small bag of plain cloth, drawn shut with a cord.",
} as const satisfies StoryItem

import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiiNalaWoolStockings = {
  id: "01a0f39f-88cd-7c80-a250-a72155dd37dd",
  type: "page-type/story-item",
  slug: "overwhere-iii-nala-wool-stockings",
  title: "Wool Stockings",
  story: "story-played/overwhere-iii",
  character: "character-player/overwhere-iii-nala",
  quantity: 2,
  description: "Two pairs of thick knitted wool stockings from Bet's box, darned at the heels.",
} as const satisfies StoryItem

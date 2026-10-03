import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const fairweatherCopperRankTag = {
  id: "01a102b7-564a-73db-9cc7-28424b0a81df",
  type: "page-type/story-item",
  slug: "fairweather-copper-rank-tag",
  title: "Copper Rank Tag",
  story: "story-written/fairweather",
  character: "character-player/fairweather-elsie",
  description:
    "A small copper tag of the Adventurers' Guild, stamped with the holder's name and rank, F, and hung at the belt.",
} as const satisfies StoryItem

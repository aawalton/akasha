import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIBoardChitWeirWyrm = {
  id: "01a101d1-8046-71c5-9bd5-bb603141b74c",
  type: "page-type/story-item",
  slug: "overwhere-i-board-chit-weir-wyrm",
  title: "Board Chit for the Weir Wyrm",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description:
    "Grete Holm's signed chit for 15 gold, the Weir Wyrm's bounty, paid when the tax rider comes.",
} as const satisfies StoryItem

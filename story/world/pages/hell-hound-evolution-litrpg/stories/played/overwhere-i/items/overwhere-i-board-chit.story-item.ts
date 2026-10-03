import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIBoardChit = {
  id: "01a0ff2d-5a7e-7bc9-83cf-5c35f7e6e0c8",
  type: "page-type/story-item",
  slug: "overwhere-i-board-chit",
  title: "Board Chit",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description:
    "A chit signed by Grete Holm promising Nala Arthur 11 gold from the Board, payable at Antler Hall.",
} as const satisfies StoryItem

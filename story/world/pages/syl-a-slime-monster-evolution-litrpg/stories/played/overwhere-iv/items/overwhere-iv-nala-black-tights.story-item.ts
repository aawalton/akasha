import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaBlackTights = {
  id: "01a0f1bc-56c6-7f04-b7f0-9756f10a2fdd",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-black-tights",
  title: "Black Tights",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  slot: "item-slot/legs",
  description: "Black tights of a fine stretching weave no one in Millbrook could make.",
} as const satisfies StoryItem

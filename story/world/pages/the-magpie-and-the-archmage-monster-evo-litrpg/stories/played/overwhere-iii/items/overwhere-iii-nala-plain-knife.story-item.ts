import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiiNalaPlainKnife = {
  id: "01a0fdd3-9f5d-70d7-a65f-7261ecfc459e",
  type: "page-type/story-item",
  slug: "overwhere-iii-nala-plain-knife",
  title: "Plain Knife",
  story: "story-played/overwhere-iii",
  character: "character-player/overwhere-iii-nala",
  description:
    "A worn iron knife with a hand-long blade and a wrapped wooden grip, in a worn sheath.",
} as const satisfies StoryItem

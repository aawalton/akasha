import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIVossSealedLetter = {
  id: "01a0fe5d-f837-7b70-bab3-e0c0b0c4197d",
  type: "page-type/story-item",
  slug: "overwhere-i-voss-sealed-letter",
  title: "Sealed Letter",
  story: "story-played/overwhere-i",
  place: "place/overwhere-i-wendlow",
  description:
    "A folded letter taken from Harl Voss's jerkin, its guild counting-house seal broken by Grete, who keeps it for the magistrate.",
} as const satisfies StoryItem

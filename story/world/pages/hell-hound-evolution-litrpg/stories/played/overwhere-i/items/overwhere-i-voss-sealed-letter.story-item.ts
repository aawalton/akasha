import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIVossSealedLetter = {
  id: "01a0fe5d-f837-7b70-bab3-e0c0b0c4197d",
  type: "page-type/story-item",
  slug: "overwhere-i-voss-sealed-letter",
  title: "Sealed Letter",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description: "A folded letter under an unbroken wax seal, taken from Harl Voss's jerkin.",
} as const satisfies StoryItem

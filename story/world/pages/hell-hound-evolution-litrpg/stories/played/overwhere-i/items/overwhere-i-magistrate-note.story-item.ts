import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIMagistrateNote = {
  id: "01a101f1-da57-7419-a0c2-6a68b6020be8",
  type: "page-type/story-item",
  slug: "overwhere-i-magistrate-note",
  title: "Magistrate's Note",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description:
    "Magistrate Odile Varne's note asking Nala Arthur to the Moot Hall at noon on day 9.",
} as const satisfies StoryItem

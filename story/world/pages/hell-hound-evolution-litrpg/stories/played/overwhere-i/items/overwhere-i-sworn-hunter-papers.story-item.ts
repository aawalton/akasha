import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereISwornHunterPapers = {
  id: "01a106fe-2df9-7cc5-94ac-ac4465cb8c4f",
  type: "page-type/story-item",
  slug: "overwhere-i-sworn-hunter-papers",
  title: "Sworn Hunter's Papers",
  story: "story-played/overwhere-i",
  character: "character-player/overwhere-i-nala",
  description:
    "A sheet in Magistrate Odile Varne's small, quick hand, naming Nala Arthur a sworn hunter of Wendlow, under the margrave, sealed at its foot in red wax.",
} as const satisfies StoryItem

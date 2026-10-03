import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaCrackedGreymawChambers = {
  id: "01a101bb-2d01-755b-941b-ff21bcb7c0f9",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-cracked-greymaw-chambers",
  title: "Cracked Greymaw Chamber",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  description:
    "A fist-sized knot of polished grey bone, layered like a shell, cracked clean through by a spear.",
  quantity: 5,
} as const satisfies StoryItem

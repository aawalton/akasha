import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaGreymawChambers = {
  id: "01a0f35c-f7df-741c-8174-ce23a84d9989",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-greymaw-chambers",
  title: "Greymaw Chamber",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  description: "A fist-sized knot of polished grey bone, layered like a shell and empty of Water.",
  quantity: 2,
} as const satisfies StoryItem

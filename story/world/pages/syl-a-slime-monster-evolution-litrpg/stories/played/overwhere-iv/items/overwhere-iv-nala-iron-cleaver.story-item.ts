import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaIronCleaver = {
  id: "01a0fd71-8452-741e-bda3-170fc6c8a95a",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-iron-cleaver",
  title: "Notched Iron Cleaver",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  description: "A heavy, broad-bladed iron cleaver, its edge notched.",
} as const satisfies StoryItem

import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiNalaBoarSpear = {
  id: "01a0f249-3a7c-71ce-b7b7-a3fc0177879a",
  type: "page-type/story-item",
  slug: "overwhere-ii-nala-boar-spear",
  title: "Boar Spear",
  story: "story-played/overwhere-ii",
  character: "character-player/overwhere-ii-nala",
  slot: "item-slot/main-hand",
  description: "A long, heavy ash spear with a plain iron head and a crossbar below the blade.",
} as const satisfies StoryItem

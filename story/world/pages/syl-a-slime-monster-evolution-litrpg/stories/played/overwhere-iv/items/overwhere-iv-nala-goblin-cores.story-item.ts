import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIvNalaGoblinCores = {
  id: "01a10191-a445-783c-809b-b32e7c1513cd",
  type: "page-type/story-item",
  slug: "overwhere-iv-nala-goblin-cores",
  title: "Goblin Cores",
  story: "story-played/overwhere-iv",
  character: "character-player/overwhere-iv-nala",
  quantity: 6,
  description: "Small dark cores taken from under goblins' breastbones, sold for their mana.",
} as const satisfies StoryItem

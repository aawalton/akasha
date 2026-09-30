import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const overwhereIiiNalaLowHealingPotions = {
  id: "01a0f38d-c294-7d4a-8dff-deca942b64ba",
  type: "page-type/story-item",
  slug: "overwhere-iii-nala-low-healing-potions",
  title: "Low Healing Potions",
  story: "story-played/overwhere-iii",
  character: "character-player/overwhere-iii-nala",
  quantity: 2,
  description:
    "Two small clay flasks of Brannagh's cloudy green brew, each giving back about 10 health.",
} as const satisfies StoryItem

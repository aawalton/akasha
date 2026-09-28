import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiWaterfallCave = {
  id: "01a0e9be-00c8-768b-b2dd-8c9884a6bafd",
  type: "page-type/place",
  slug: "otherwhere-ii-waterfall-cave",
  title: "The Mana-Infused Waterfall",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-bladewind-badlands",
  facts: [
    {
      fact: "A mana-rich waterfall on the badlands cliff hides a cave with a small obelisk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The falls emit dense water and force mana, ideal for training body and mind.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place

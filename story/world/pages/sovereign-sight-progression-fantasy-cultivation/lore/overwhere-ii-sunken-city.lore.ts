import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiSunkenCity = {
  id: "01a0ed30-7f20-7ca5-a593-537afdb8d750",
  type: "page-type/lore",
  slug: "overwhere-ii-sunken-city",
  title: "The Sunken City",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "The Sunken City lies below the Gnarl, down its western low road.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Sunken City is said to be squalid.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Poisons sell for gold in the Sunken City.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereFallenBeasts = {
  id: "01a0e9c2-fe15-7e5b-825b-a840633aecce",
  type: "page-type/lore",
  slug: "otherwhere-fallen-beasts",
  title: "Fallen Beasts",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Fallen rhino of the arena is skinless and mutated, bulging with muscle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It charges very fast but turns poorly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its horn makes a Rare armor-piercing spear.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore

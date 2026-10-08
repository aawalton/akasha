import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiFallenBeasts = {
  id: "01a0e9c2-fe15-7e5b-825b-a840633aecce",
  type: "page-type/lore",
  slug: "otherwhere-ii-fallen-beasts",
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
  createdAt: "2026-09-28T20:44:25.493Z",
  updatedAt: "2026-09-28T22:33:51.000Z",
} as const satisfies Lore

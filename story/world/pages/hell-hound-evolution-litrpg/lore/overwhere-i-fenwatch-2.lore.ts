import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIFenwatch2 = {
  id: "01a0f3bc-9a5f-757a-aef5-0a6ff3ad2893",
  type: "page-type/lore",
  slug: "overwhere-i-fenwatch-2",
  title: "Fenwatch, continued",
  world: "world/hell-hound-evolution-litrpg",
  about: "place/overwhere-i-fenwatch",
  facts: [
    {
      fact: "Clearing the eel traps of reedlurkers raises Fenwatch's regard for Nala to 6.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

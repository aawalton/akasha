import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiElizabethDuval = {
  id: "01a0e9ca-01e9-74dd-8f05-ff220f63ed9f",
  type: "page-type/lore",
  slug: "otherwhere-ii-elizabeth-duval",
  title: "Elizabeth 'Liz' Duval",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Elizabeth 'Liz' Duval is an auburn-haired, blue-eyed human contestant of Earth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is a widow and a former political consultant who turns thirty as integration hits.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore

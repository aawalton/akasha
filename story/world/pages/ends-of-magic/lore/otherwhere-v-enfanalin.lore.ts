import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVEnfanalin = {
  id: "01a0e9fa-40da-7a6c-9250-954ddf6e2139",
  type: "page-type/lore",
  slug: "otherwhere-v-enfanalin",
  title: "Enfanalin",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-enfanalin",
  facts: [
    {
      fact: "Enfanalin is a Questor who leads the Enfanalin grid, one of the best mercenary grids.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season she leads her mercenaries for hire among the Questors.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore

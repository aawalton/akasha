import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVDragonwolf = {
  id: "01a0e9f8-965f-79b1-a734-775d07cac990",
  type: "page-type/lore",
  slug: "otherwhere-v-dragonwolf",
  title: "Dragonwolf",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-dragonwolf",
  facts: [
    {
      fact: "Dragonwolves are fire-breathing predators of Elothia's wilds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dragonwolves are wary and very hard to catch by surprise.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rangers of Elothia hunt dragonwolves, often trying to lie in wait for them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "To a seasoned hunter, dragonwolves are lesser prey next to Elothia's hillboars.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

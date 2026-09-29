import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiKule = {
  id: "01a0ea8a-d22b-791f-b303-64a46f21b841",
  type: "page-type/lore",
  slug: "otherwhere-xi-kule",
  title: "Prince Kule",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-kule",
  facts: [
    {
      fact: "Kule, also called Kune, was First and Crown Prince of Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Constable Tarano ruled the royalists in Kule's name during the civil war.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kule lay comatose, missing limbs, with a hole in his flank.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The royalists offered Viv a pardon to heal Kule with her regrowth spell; she refused.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sangor, the Nigh King, killed Kule at the fall of Green Edge; Kule is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiGyrna = {
  id: "01a0ea85-3eb0-7462-8c52-1e1729fee179",
  type: "page-type/lore",
  slug: "otherwhere-xi-gyrna",
  title: "Gyrna",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-gyrna",
  facts: [
    {
      fact: "Gyrna is a dweller of Helock's slums, known to Viv from her Academy years.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gyrna's fate after Oleander took Helock is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

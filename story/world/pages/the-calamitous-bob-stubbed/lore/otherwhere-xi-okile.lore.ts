import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiOkile = {
  id: "01a0ea82-d976-7544-b9fd-7434ef986a65",
  type: "page-type/lore",
  slug: "otherwhere-xi-okile",
  title: "Okile",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-okile",
  facts: [
    {
      fact: "Okile is a tenured enchanter at the Academy of Helock, of Viziman heritage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Okile is effeminate, and casts red and gray mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Okile examined Viv when she sought entry to the Academy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Okile is among the Academy's staff, scattered since Oleander took Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

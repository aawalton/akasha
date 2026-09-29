import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiJorn = {
  id: "01a0ea91-710e-7f28-9819-d0d37c81cf9f",
  type: "page-type/lore",
  slug: "otherwhere-xi-jorn",
  title: "Jorn",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-jorn",
  facts: [
    {
      fact: "Jorn was a friend of Viv's.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv remembers Jorn beside Cernit and Benetti among the friends she has lost.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSiul = {
  id: "01a0ea87-7ebc-72cb-ad0e-315b3b58a52a",
  type: "page-type/lore",
  slug: "otherwhere-xi-siul",
  title: "Siul",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-siul",
  facts: [
    {
      fact: "Siul was a merl, Sidjin's friend on Glastia's wall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Siul is dead, murdered on Glastia's wall by Prince Medjin's nephew.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

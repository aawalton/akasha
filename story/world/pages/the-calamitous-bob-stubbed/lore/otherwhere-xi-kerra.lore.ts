import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiKerra = {
  id: "01a0ea8c-81fc-7762-ab2a-0d3f0f88ca46",
  type: "page-type/lore",
  slug: "otherwhere-xi-kerra",
  title: "Kerra",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-kerra",
  facts: [
    {
      fact: "Kerra is a commoner of New Harrak who stole food, and whom Viv pardoned.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kerra is thought to live in New Harrak still this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

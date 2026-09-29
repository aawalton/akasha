import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiShola = {
  id: "01a0ea86-c326-79bb-a1af-12ae19e6eddd",
  type: "page-type/lore",
  slug: "otherwhere-xi-shola",
  title: "Shola",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-shola",
  facts: [
    {
      fact: "Shola is a kark of the steppes, met by Viv's expedition near Sky-Mirror Lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Shola lives among the kark tribes of the steppes.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

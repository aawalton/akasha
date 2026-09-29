import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiRana = {
  id: "01a0ea85-0b85-7949-9178-8d340b1fb710",
  type: "page-type/lore",
  slug: "otherwhere-xi-rana",
  title: "Rana",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-rana",
  facts: [
    {
      fact: "Rana is a kark of the steppes, met by Viv's expedition near Sky-Mirror Lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Rana lives among the kark tribes of the steppes.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiDeos = {
  id: "01a0ea7c-0781-722d-a3ff-e1546f49bd8d",
  type: "page-type/lore",
  slug: "otherwhere-xi-deos",
  title: "Deos",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-deos",
  facts: [
    {
      fact: "Deos is an obese man who was master of ceremonies at the Glastian succession contest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The contest Deos ran was held in Helock's arena between Glastia's eight royal heirs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Deos is this season is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

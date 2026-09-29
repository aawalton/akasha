import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiShawak = {
  id: "01a0ea87-7ebb-7a43-b87e-8eaf7d8c30be",
  type: "page-type/lore",
  slug: "otherwhere-xi-shawak",
  title: "Shawak",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-shawak",
  facts: [
    {
      fact: "Shawak is a merl scout of the Deadshield Woods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shawak met Viv when she was lost in the woods and brought her among the merls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Shawak is with the merls of Sikoua.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

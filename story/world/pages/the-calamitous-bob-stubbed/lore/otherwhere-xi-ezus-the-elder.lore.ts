import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEzusTheElder = {
  id: "01a0ea81-c5cd-7948-b6a6-0055f1628ff6",
  type: "page-type/lore",
  slug: "otherwhere-xi-ezus-the-elder",
  title: "Baron Ezus the Elder",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-ezus-the-elder",
  facts: [
    {
      fact: "Baron Ezus the Elder is an Enorian baron who has a son, Ezus the younger.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ezus and his son met Viv on her journey across Enoria to the summit at Mornyr.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ezus is thought to be on his Enorian lands this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

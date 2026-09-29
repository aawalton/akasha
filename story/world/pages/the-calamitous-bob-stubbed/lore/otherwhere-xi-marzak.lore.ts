import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMarzak = {
  id: "01a0ea81-9b0a-72eb-a77b-8b95ea05d7b4",
  type: "page-type/lore",
  slug: "otherwhere-xi-marzak",
  title: "Marzak",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-marzak",
  facts: [
    {
      fact: "King Marzak took Baran's crown for Oleander's side after Irao killed King Erezak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Marzak was one of the leaders of the Kingdom of Maranor's army.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Marzak's cause is broken, after Maranor's army was routed.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

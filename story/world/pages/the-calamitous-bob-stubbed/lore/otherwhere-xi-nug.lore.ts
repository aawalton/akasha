import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiNug = {
  id: "01a0ea82-d976-7f49-b604-3c5a3a9ca43f",
  type: "page-type/lore",
  slug: "otherwhere-xi-nug",
  title: "Nug",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-nug",
  facts: [
    {
      fact: "Nug is a dweller of Helock's slums, known to Viv from her Academy years.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Nug is in Helock, a city now bowed to Maranor's side and leaderless.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

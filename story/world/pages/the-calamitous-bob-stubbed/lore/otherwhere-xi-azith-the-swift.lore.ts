import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiAzithTheSwift = {
  id: "01a0ea78-368b-78e7-8bb2-9b690c66afe7",
  type: "page-type/lore",
  slug: "otherwhere-xi-azith-the-swift",
  title: "Azith the Swift",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-azith-the-swift",
  facts: [
    {
      fact: "Azith the Swift was one of the elite champions of Oleander's Kingdom of Maranor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Azith died in the final war with most of Maranor's elites; Azith is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

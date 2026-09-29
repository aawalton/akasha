import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiArrinTheHurricane = {
  id: "01a0ea78-368b-786c-b322-dee81bf445ad",
  type: "page-type/lore",
  slug: "otherwhere-xi-arrin-the-hurricane",
  title: "Arrin the Hurricane",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-arrin-the-hurricane",
  facts: [
    {
      fact: "Arrin the Hurricane was one of the elite champions of Oleander's Kingdom of Maranor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arrin died in the final war with most of Maranor's elites; Arrin is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

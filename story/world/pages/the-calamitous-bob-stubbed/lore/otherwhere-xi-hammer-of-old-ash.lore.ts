import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiHammerOfOldAsh = {
  id: "01a0ea85-d3d6-74ed-aa06-28e1688f9fe8",
  type: "page-type/lore",
  slug: "otherwhere-xi-hammer-of-old-ash",
  title: "Hammer of Old Ash",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-hammer-of-old-ash",
  facts: [
    {
      fact: "The Hammer of Old Ash was one of the elite champions of Oleander's Kingdom of Maranor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Hammer of Old Ash died in the final war with most of Maranor's elites, and is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

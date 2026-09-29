import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiNaila = {
  id: "01a0ea82-d976-765f-a43e-0b6d23b3d49b",
  type: "page-type/lore",
  slug: "otherwhere-xi-naila",
  title: "Naila",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-naila",
  facts: [
    {
      fact: "Naila was Queen of Sandsong in Vizim, wife of King Jei.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Naila is dead, killed with Jei by Oleander after the Battle of Barrier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Naila and Jei begged Viv's secret help against the invading Sheem.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Naila's baby daughter Mimir was carried away with Sandsong's evacuees.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Naila's uncle is Kass Tilaperisi.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

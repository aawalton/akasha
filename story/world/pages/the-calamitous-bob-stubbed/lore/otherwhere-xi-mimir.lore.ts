import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMimir = {
  id: "01a0ea7f-3b3d-7fe4-bb7b-fed3a509272c",
  type: "page-type/lore",
  slug: "otherwhere-xi-mimir",
  title: "Mimir",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-mimir",
  facts: [
    {
      fact: "Mimir is the baby daughter of King Jei and Queen Naila of Sandsong.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mimir's parents were killed by Oleander when Sandsong fell.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mimir was carried out of Sandsong's capital among the evacuees.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kass Tilaperisi, the late queen's uncle, set out to find Mimir.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Mimir, heir of Sandsong, is an infant in exile, her fate unknown to most.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSel = {
  id: "01a0ea85-0b86-7983-9549-7fc453b7547c",
  type: "page-type/lore",
  slug: "otherwhere-xi-sel",
  title: "Sel",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-sel",
  facts: [
    {
      fact: "Sel is the gray-haired head of admissions at the Academy of Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sel registered Viv when she came to the Academy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Sel is among the Academy's staff, scattered since Oleander took Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiKassTilaperisi = {
  id: "01a0ea8b-d2ff-7829-8743-45705182aa13",
  type: "page-type/lore",
  slug: "otherwhere-xi-kass-tilaperisi",
  title: "Kass Tilaperisi",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-kass-tilaperisi",
  facts: [
    {
      fact: "Kass Tilaperisi is a lord of Sandsong, uncle of its late Queen Naila.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kass's son Sin is Viv's sworn guard.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kass sailed with Sandsong's evacuees, charged to find the queen's baby daughter Mimir.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Kass is this season, and whether he found Mimir, is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore

import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiAncientSarodon = {
  id: "01a0ea78-368b-7e95-a296-f6eb2693046e",
  type: "page-type/lore",
  slug: "otherwhere-xi-ancient-sarodon",
  title: "The Ancient Sarodon",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-ancient-sarodon",
  facts: [
    {
      fact: "The Ancient Sarodon was a massive monster of the lands beyond the Glastian wall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A beastling slew the Ancient Sarodon, and its death began the great beastling tide on Glastia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Ancient Sarodon is dead; the beastling tide it loosed was destroyed years ago.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-29T00:02:21.963Z",
  updatedAt: "2026-09-29T00:02:25.000Z",
} as const satisfies Lore

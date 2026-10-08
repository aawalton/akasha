import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiCrimsonBlight = {
  id: "01a0e9c1-484c-75cf-aa81-94366a7bbe70",
  type: "page-type/lore",
  slug: "otherwhere-ii-crimson-blight",
  title: "The Crimson Blight",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Crimson Blight is a red fungal parasite rated a calamity-class entity.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It spreads by spores and mycelium and turns hosts into networked thralls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A blade forged to fight it grants its bearer some resistance to it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:42:33.420Z",
  updatedAt: "2026-09-28T22:32:31.000Z",
} as const satisfies Lore

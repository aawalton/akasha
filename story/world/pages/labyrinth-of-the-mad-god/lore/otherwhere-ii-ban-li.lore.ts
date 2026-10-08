import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiBanLi = {
  id: "01a0e9cf-bd36-755a-a67f-e0b1e9c5b225",
  type: "page-type/lore",
  slug: "otherwhere-ii-ban-li",
  title: "Ban-Li, Bear of Living Flame",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Ban-Li is a towering bear of living flame that rules the Burning Wastes.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:58:20.854Z",
  updatedAt: "2026-09-28T22:30:51.000Z",
} as const satisfies Lore

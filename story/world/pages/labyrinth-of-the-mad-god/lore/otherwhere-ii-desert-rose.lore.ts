import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiDesertRose = {
  id: "01a0e9cb-9156-7842-9d86-7783231d283c",
  type: "page-type/lore",
  slug: "otherwhere-ii-desert-rose",
  title: "Desert Rose",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Earth's crops survive integration and absorb mana as they grow.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:53:47.478Z",
  updatedAt: "2026-09-28T22:32:31.000Z",
} as const satisfies Lore

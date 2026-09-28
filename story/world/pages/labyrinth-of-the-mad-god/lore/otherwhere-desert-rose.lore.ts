import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereDesertRose = {
  id: "01a0e9cb-9156-7842-9d86-7783231d283c",
  type: "page-type/lore",
  slug: "otherwhere-desert-rose",
  title: "Desert Rose",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Earth's crops survive integration and absorb mana as they grow.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore

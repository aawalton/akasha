import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiTigerKing = {
  id: "01a0e9ce-df77-7449-9eb5-1cedb9a3528c",
  type: "page-type/lore",
  slug: "otherwhere-ii-tiger-king",
  title: "The Tiger King",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Dreadbeasts on Earth once commanded lesser minions.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:57:24.087Z",
  updatedAt: "2026-09-28T22:37:21.000Z",
} as const satisfies Lore

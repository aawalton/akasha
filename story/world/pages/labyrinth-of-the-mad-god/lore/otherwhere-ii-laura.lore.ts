import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiLaura = {
  id: "01a0e9ca-01ea-7852-a3f1-1bfe6a868016",
  type: "page-type/lore",
  slug: "otherwhere-ii-laura",
  title: "Laura",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Laura is a blond human contestant of Earth with a gift for lightning.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:52:05.226Z",
  updatedAt: "2026-09-28T22:34:49.000Z",
} as const satisfies Lore

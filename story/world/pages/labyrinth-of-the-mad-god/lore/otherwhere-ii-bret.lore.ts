import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiBret = {
  id: "01a0e9ca-c7c3-7652-9583-7c60b02e8526",
  type: "page-type/lore",
  slug: "otherwhere-ii-bret",
  title: "Bret",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Bret is a human contestant of Earth who fights with a greatsword.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:52:55.875Z",
  updatedAt: "2026-09-28T22:30:51.000Z",
} as const satisfies Lore

import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiKerry = {
  id: "01a0e9ca-c7c4-7b1b-adb8-49bd4d4b3314",
  type: "page-type/lore",
  slug: "otherwhere-ii-kerry",
  title: "Kerry",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Kerry is a merchant among Earth's contestants who trades and keeps careful records.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:52:55.876Z",
  updatedAt: "2026-09-28T22:34:49.000Z",
} as const satisfies Lore

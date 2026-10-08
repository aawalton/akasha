import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiYarren = {
  id: "01a0e9ce-df77-7141-8cf8-67d9c348b70f",
  type: "page-type/lore",
  slug: "otherwhere-ii-yarren",
  title: "Yarren",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Yarren is a slender native of the quarantine zone's world, yellow-skinned with spiraling horns.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:57:24.087Z",
  updatedAt: "2026-09-28T22:38:17.000Z",
} as const satisfies Lore

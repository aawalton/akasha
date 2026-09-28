import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereYarren = {
  id: "01a0e9ce-df77-7141-8cf8-67d9c348b70f",
  type: "page-type/lore",
  slug: "otherwhere-yarren",
  title: "Yarren",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Yarren is a slender native of the quarantine zone's world, yellow-skinned with spiraling horns.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore

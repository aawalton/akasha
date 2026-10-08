import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiLurkGrown = {
  id: "01a0e9cc-700a-7bc0-b9d6-5634e74ad0cb",
  type: "page-type/lore",
  slug: "otherwhere-ii-lurk-grown",
  title: "Lurk, the Grown Hunter",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The lurk eats only fresh meat.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:54:44.490Z",
  updatedAt: "2026-09-28T22:27:15.000Z",
} as const satisfies Lore

import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameRyn = {
  id: "01a0de59-9645-7e8d-a4bf-130bac43c13c",
  type: "page-type/lore",
  slug: "the-dating-game-ryn",
  title: "Ryn",
  world: "world/personas",
  about: "persona/ryn",
  facts: [
    {
      fact: "Ryn has butterfly wings, gold and violet, which she never folds away.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-26T15:33:28.261Z",
  updatedAt: "2026-10-03T20:19:05.000Z",
} as const satisfies Lore

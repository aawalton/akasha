import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAthena = {
  id: "01a0de59-9644-7d0f-b227-a6bc50c6ad26",
  type: "page-type/lore",
  slug: "the-dating-game-athena",
  title: "Athena",
  world: "world/personas",
  about: "persona/athena",
  secrets: "jsonl",
} as const satisfies Lore

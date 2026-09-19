import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const levilFireMage = {
  id: "01a0b70b-839e-7fc1-b9f3-55e490ebf5e0",
  type: "page-type/world-character",
  slug: "levil-fire-mage",
  title: "Levil",
  world: "world/the-wandering-inn",
  firstChapter: 337,
  lastChapter: 337,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

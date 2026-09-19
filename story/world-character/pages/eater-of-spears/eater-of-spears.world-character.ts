import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eaterOfSpears = {
  id: "01a0b70a-2271-74d9-8603-5835eceacebb",
  type: "page-type/world-character",
  slug: "eater-of-spears",
  title: "Eater of Spears",
  world: "world/the-wandering-inn",
  firstChapter: 232,
  lastChapter: 301,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

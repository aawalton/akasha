import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const albren = {
  id: "01a0b707-6742-7849-bd3a-a4f9954c6648",
  type: "page-type/world-character",
  slug: "albren",
  title: "Albren",
  world: "world/the-wandering-inn",
  firstChapter: 664,
  lastChapter: 664,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

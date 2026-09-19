import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const jurix = {
  id: "01a0b70b-2314-7509-88f6-5d649a8c15e0",
  type: "page-type/world-character",
  slug: "jurix",
  title: "Jurix",
  world: "world/the-wandering-inn",
  firstChapter: 162,
  lastChapter: 163,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

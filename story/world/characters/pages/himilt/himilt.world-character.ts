import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const himilt = {
  id: "01a0b70a-fd2a-79c9-84e5-c278473cc4cf",
  type: "page-type/world-character",
  slug: "himilt",
  title: "Himilt",
  world: "world/the-wandering-inn",
  firstChapter: 312,
  lastChapter: 763,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

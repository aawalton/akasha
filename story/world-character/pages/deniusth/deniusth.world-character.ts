import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const deniusth = {
  id: "01a0b70a-17d2-7cd2-9ce5-7e8a934862a3",
  type: "page-type/world-character",
  slug: "deniusth",
  title: "Deniusth",
  world: "world/the-wandering-inn",
  firstChapter: 619,
  lastChapter: 621,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

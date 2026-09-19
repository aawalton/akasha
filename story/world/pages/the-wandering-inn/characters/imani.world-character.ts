import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const imani = {
  id: "01a0b70b-0a71-7c22-964a-91cc59573ca8",
  type: "page-type/world-character",
  slug: "imani",
  title: "Imani",
  world: "world/the-wandering-inn",
  firstChapter: 109,
  lastChapter: 820,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gerial = {
  id: "01a0b70a-9bc8-77ab-afbc-848a4ea51c75",
  type: "page-type/world-character",
  slug: "gerial",
  title: "Gerial",
  world: "world/the-wandering-inn",
  firstChapter: 29,
  lastChapter: 329,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

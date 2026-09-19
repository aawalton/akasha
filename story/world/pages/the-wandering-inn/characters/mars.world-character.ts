import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mars = {
  id: "01a0b70b-9cbe-72c1-83ce-54f8efa494a3",
  type: "page-type/world-character",
  slug: "mars",
  title: "Mars",
  world: "world/the-wandering-inn",
  firstChapter: 92,
  lastChapter: 733,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

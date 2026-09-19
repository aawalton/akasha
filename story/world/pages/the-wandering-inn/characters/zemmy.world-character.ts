import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const zemmy = {
  id: "01a0b70d-eb8f-74be-852a-d377f9ff8daa",
  type: "page-type/world-character",
  slug: "zemmy",
  title: "Zemmy",
  world: "world/the-wandering-inn",
  firstChapter: 736,
  lastChapter: 736,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

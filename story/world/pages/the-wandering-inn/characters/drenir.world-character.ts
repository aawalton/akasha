import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const drenir = {
  id: "01a0b70a-1e73-754c-b127-1ad5944867d1",
  type: "page-type/world-character",
  slug: "drenir",
  title: "Drenir",
  world: "world/the-wandering-inn",
  firstChapter: 513,
  lastChapter: 514,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kentScott = {
  id: "01a0b70b-66fc-7a1b-92db-08265aabcd8c",
  type: "page-type/world-character",
  slug: "kent-scott",
  title: "Kent Scott",
  world: "world/the-wandering-inn",
  firstChapter: 67,
  lastChapter: 487,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

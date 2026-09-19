import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const etrogaer = {
  id: "01a0b70a-755d-7483-bf9b-346d0b3eb942",
  type: "page-type/world-character",
  slug: "etrogaer",
  title: "Etrogaer",
  world: "world/the-wandering-inn",
  firstChapter: 608,
  lastChapter: 608,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

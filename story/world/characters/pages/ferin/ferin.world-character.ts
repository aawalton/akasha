import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ferin = {
  id: "01a0b70a-80cf-7a0c-b5ff-c1719856663a",
  type: "page-type/world-character",
  slug: "ferin",
  title: "Ferin",
  world: "world/the-wandering-inn",
  firstChapter: 468,
  lastChapter: 468,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

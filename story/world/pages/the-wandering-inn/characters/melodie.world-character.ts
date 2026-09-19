import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const melodie = {
  id: "01a0b70b-e5b2-7327-aa67-7e336e411594",
  type: "page-type/world-character",
  slug: "melodie",
  title: "Melodie",
  world: "world/the-wandering-inn",
  firstChapter: 336,
  lastChapter: 336,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

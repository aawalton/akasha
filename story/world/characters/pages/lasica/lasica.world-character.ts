import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lasica = {
  id: "01a0b70b-7dc0-740b-9e10-3050e3c9dfb7",
  type: "page-type/world-character",
  slug: "lasica",
  title: "Lasica",
  world: "world/the-wandering-inn",
  firstChapter: 320,
  lastChapter: 644,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

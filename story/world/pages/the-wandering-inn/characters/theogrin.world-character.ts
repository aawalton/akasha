import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theogrin = {
  id: "01a0b70d-2391-7a3f-ac63-6d5d1cd41168",
  type: "page-type/world-character",
  slug: "theogrin",
  title: "Theogrin",
  world: "world/the-wandering-inn",
  firstChapter: 605,
  lastChapter: 605,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

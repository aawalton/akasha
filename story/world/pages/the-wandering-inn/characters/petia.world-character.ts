import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const petia = {
  id: "01a0b70c-6916-7505-9ce6-f2e4e17bc785",
  type: "page-type/world-character",
  slug: "petia",
  title: "Petia",
  world: "world/the-wandering-inn",
  firstChapter: 692,
  lastChapter: 692,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

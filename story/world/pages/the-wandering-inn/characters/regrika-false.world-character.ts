import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const regrikaFalse = {
  id: "01a0b70c-8bf3-7a26-926d-8fcba634fb72",
  type: "page-type/world-character",
  slug: "regrika-false",
  title: "skeleton warrior in disguise",
  world: "world/the-wandering-inn",
  firstChapter: 211,
  lastChapter: 211,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

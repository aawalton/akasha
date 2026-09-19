import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const serEldein = {
  id: "01a0b70c-f32b-7c0d-9c53-b5be4d0a5212",
  type: "page-type/world-character",
  slug: "ser-eldein",
  title: "Ser Eldein",
  world: "world/the-wandering-inn",
  firstChapter: 378,
  lastChapter: 378,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

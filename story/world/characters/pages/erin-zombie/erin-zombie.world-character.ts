import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const erinZombie = {
  id: "01a0b70a-72fb-7ba2-ba7d-13f8f2a15858",
  type: "page-type/world-character",
  slug: "erin-zombie",
  title: "zombie (Erin-like)",
  world: "world/the-wandering-inn",
  firstChapter: 364,
  lastChapter: 364,
  characterClaims: "jsonl",
  aliasOf: "world-character/erin-solstice",
} as const satisfies WorldCharacter

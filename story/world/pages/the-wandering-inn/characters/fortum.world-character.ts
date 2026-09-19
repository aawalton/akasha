import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const fortum = {
  id: "01a0b70a-8c04-7d60-ac0e-b02eca77db45",
  type: "page-type/world-character",
  slug: "fortum",
  title: "Fortum (called 'Old Man')",
  world: "world/the-wandering-inn",
  firstChapter: 130,
  lastChapter: 131,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

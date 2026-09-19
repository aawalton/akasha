import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const veine = {
  id: "01a0b70d-8a2a-7d83-b5bf-bc6565e96ca4",
  type: "page-type/world-character",
  slug: "veine",
  title: "Strategist Veine",
  world: "world/the-wandering-inn",
  firstChapter: 731,
  lastChapter: 731,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

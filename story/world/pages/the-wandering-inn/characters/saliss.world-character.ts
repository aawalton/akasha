import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const saliss = {
  id: "01a06580-2495-7632-8ca4-54ddccefbfc2",
  type: "page-type/world-character",
  slug: "saliss",
  title: "Saliss",
  world: "world/the-wandering-inn",
  maxLevel: 56,
  eventCount: 2,
  firstChapter: 396,
  lastChapter: 794,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

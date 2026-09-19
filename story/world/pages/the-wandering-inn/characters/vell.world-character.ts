import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const vell = {
  id: "01a0b70d-8b48-79a6-aa57-0e938bba102e",
  type: "page-type/world-character",
  slug: "vell",
  title: "Vell",
  world: "world/the-wandering-inn",
  firstChapter: 341,
  lastChapter: 341,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

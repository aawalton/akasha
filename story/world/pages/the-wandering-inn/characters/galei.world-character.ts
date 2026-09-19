import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const galei = {
  id: "01a0b70a-8f87-7784-b639-8d2930d9f83a",
  type: "page-type/world-character",
  slug: "galei",
  title: "Galei",
  world: "world/the-wandering-inn",
  firstChapter: 431,
  lastChapter: 431,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

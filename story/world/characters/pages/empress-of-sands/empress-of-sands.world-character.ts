import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const empressOfSands = {
  id: "01a0b70a-6d0d-79db-96fb-ce774f23b61b",
  type: "page-type/world-character",
  slug: "empress-of-sands",
  title: "the Empress of Sands",
  world: "world/the-wandering-inn",
  firstChapter: 398,
  lastChapter: 398,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

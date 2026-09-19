import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const amared = {
  id: "01a0b707-6b38-7d95-aa20-397507c09046",
  type: "page-type/world-character",
  slug: "amared",
  title: "Amared",
  world: "world/the-wandering-inn",
  firstChapter: 655,
  lastChapter: 655,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

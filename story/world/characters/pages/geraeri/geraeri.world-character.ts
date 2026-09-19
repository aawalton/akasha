import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const geraeri = {
  id: "01a0b70a-9b22-7866-8852-2b551b6d4c2f",
  type: "page-type/world-character",
  slug: "geraeri",
  title: "Geraeri",
  world: "world/the-wandering-inn",
  firstChapter: 806,
  lastChapter: 806,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

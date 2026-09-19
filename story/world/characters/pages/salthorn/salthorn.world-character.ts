import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const salthorn = {
  id: "01a0b70c-ab74-70a2-8d2a-300aab4be500",
  type: "page-type/world-character",
  slug: "salthorn",
  title: "Salthorn",
  world: "world/the-wandering-inn",
  firstChapter: 402,
  lastChapter: 636,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

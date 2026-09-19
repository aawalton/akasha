import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const goelvGazer = {
  id: "01a0b70a-e53a-7b3b-b713-2f537f6f89ac",
  type: "page-type/world-character",
  slug: "goelv-gazer",
  title: "Goelv",
  world: "world/the-wandering-inn",
  firstChapter: 496,
  lastChapter: 496,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

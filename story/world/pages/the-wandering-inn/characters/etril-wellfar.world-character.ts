import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const etrilWellfar = {
  id: "01a0b70a-7523-7c4e-b27b-59ba57fc6956",
  type: "page-type/world-character",
  slug: "etril-wellfar",
  title: "Etril Wellfar",
  world: "world/the-wandering-inn",
  firstChapter: 531,
  lastChapter: 786,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

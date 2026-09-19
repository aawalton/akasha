import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tremborag = {
  id: "01a0b70d-7001-7c55-9842-6d80b027e2a3",
  type: "page-type/world-character",
  slug: "tremborag",
  title: "Tremborag",
  world: "world/the-wandering-inn",
  firstChapter: 152,
  lastChapter: 295,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

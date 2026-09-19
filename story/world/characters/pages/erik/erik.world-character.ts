import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const erik = {
  id: "01a0b70a-6ed0-7ae8-8cb0-7bbf53acfdca",
  type: "page-type/world-character",
  slug: "erik",
  title: "Erik",
  world: "world/the-wandering-inn",
  firstChapter: 431,
  lastChapter: 431,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

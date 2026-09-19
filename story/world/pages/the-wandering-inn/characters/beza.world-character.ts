import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const beza = {
  id: "01a0b707-8438-7be8-a356-31032ec66731",
  type: "page-type/world-character",
  slug: "beza",
  title: "Bezale",
  world: "world/the-wandering-inn",
  firstChapter: 374,
  lastChapter: 408,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

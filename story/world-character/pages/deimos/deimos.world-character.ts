import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const deimos = {
  id: "01a0b70a-145a-707c-84b2-9964443e0e34",
  type: "page-type/world-character",
  slug: "deimos",
  title: "Deimos",
  world: "world/the-wandering-inn",
  firstChapter: 770,
  lastChapter: 770,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

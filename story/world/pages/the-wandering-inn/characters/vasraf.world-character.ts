import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const vasraf = {
  id: "01a0b70d-8908-769a-8c25-df8a88478c79",
  type: "page-type/world-character",
  slug: "vasraf",
  title: "Vasraf",
  world: "world/the-wandering-inn",
  firstChapter: 368,
  lastChapter: 541,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

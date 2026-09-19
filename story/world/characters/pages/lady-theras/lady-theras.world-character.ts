import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ladyTheras = {
  id: "01a0b70b-75c8-7a1b-867b-91c071b3a4ea",
  type: "page-type/world-character",
  slug: "lady-theras",
  title: "Theras",
  world: "world/the-wandering-inn",
  firstChapter: 215,
  lastChapter: 217,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

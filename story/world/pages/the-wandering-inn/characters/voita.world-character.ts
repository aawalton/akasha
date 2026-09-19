import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const voita = {
  id: "01a0b70d-9690-72d7-9012-bce2a1c3f0c6",
  type: "page-type/world-character",
  slug: "voita",
  title: "Voita",
  world: "world/the-wandering-inn",
  firstChapter: 563,
  lastChapter: 610,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

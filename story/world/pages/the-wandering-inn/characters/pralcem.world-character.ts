import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pralcem = {
  id: "01a0b70c-729c-7a3e-8bc5-7f35d0f820e8",
  type: "page-type/world-character",
  slug: "pralcem",
  title: "Pralcem",
  world: "world/the-wandering-inn",
  firstChapter: 382,
  lastChapter: 382,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

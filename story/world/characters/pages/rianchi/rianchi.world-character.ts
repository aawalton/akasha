import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rianchi = {
  id: "01a0b70c-96b5-7dcb-9b88-d4ca02933f37",
  type: "page-type/world-character",
  slug: "rianchi",
  title: "Rianchi",
  world: "world/the-wandering-inn",
  firstChapter: 716,
  lastChapter: 747,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

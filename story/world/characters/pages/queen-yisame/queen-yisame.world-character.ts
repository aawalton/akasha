import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const queenYisame = {
  id: "01a0b70c-7b49-7e87-8041-410c1d6304a1",
  type: "page-type/world-character",
  slug: "queen-yisame",
  title: "Queen Yisame",
  world: "world/the-wandering-inn",
  firstChapter: 453,
  lastChapter: 797,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mirn = {
  id: "01a0b70b-ef6f-7d39-a242-a1d279189810",
  type: "page-type/world-character",
  slug: "mirn",
  title: "Mirn",
  world: "world/the-wandering-inn",
  firstChapter: 441,
  lastChapter: 817,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

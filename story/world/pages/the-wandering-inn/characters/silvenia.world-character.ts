import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const silvenia = {
  id: "01a0b70d-00bc-7887-bd3f-9a90ec76cf26",
  type: "page-type/world-character",
  slug: "silvenia",
  title: "Silvenia",
  world: "world/the-wandering-inn",
  appearanceCount: 14,
  firstChapter: 439,
  lastChapter: 710,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:37.820Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter

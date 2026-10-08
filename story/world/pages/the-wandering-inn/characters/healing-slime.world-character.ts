import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const healingSlime = {
  id: "01a0b70a-f648-7723-9ad7-6086dad0d8bf",
  type: "page-type/world-character",
  slug: "healing-slime",
  title: "Healing Slime",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 770,
  lastChapter: 770,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:24.072Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter

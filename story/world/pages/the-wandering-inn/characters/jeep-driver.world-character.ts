import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const jeepDriver = {
  id: "01a0b70b-1bd7-7ecc-9802-56c806d3fe98",
  type: "page-type/world-character",
  slug: "jeep-driver",
  title: "the Jeep Driver",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 756,
  lastChapter: 756,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:33.687Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter

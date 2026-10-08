import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const feshi = {
  id: "01a0b70a-8172-776f-918d-e57dfa34a585",
  type: "page-type/world-character",
  slug: "feshi",
  title: "Feshi",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  firstChapter: 334,
  lastChapter: 566,
  characterClaims: "jsonl",
  aliasOf: "world-character/feshi-weatherfur",
  createdAt: "2026-09-19T00:21:54.162Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter

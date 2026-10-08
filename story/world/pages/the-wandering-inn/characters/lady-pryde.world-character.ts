import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ladyPryde = {
  id: "01a0b70b-747e-708c-8416-8e0237f2e5fd",
  type: "page-type/world-character",
  slug: "lady-pryde",
  title: "Pryde",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  firstChapter: 338,
  lastChapter: 761,
  characterClaims: "jsonl",
  aliasOf: "world-character/lady-pryde-ulta",
  createdAt: "2026-09-19T00:22:56.382Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter

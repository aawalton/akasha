import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const griffinPrince = {
  id: "01a0b70a-eb53-7b16-b857-6a267d9edaa2",
  type: "page-type/world-character",
  slug: "griffin-prince",
  title: "the Griffin Prince",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 540,
  lastChapter: 540,
  characterClaims: "jsonl",
  aliasOf: "world-character/griffin-prince-ostevien",
  createdAt: "2026-09-19T00:22:21.267Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter

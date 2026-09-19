import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const griffinPrince = {
  id: "01a0b70a-eb53-7b16-b857-6a267d9edaa2",
  type: "page-type/world-character",
  slug: "griffin-prince",
  title: "the Griffin Prince",
  world: "world/the-wandering-inn",
  firstChapter: 540,
  lastChapter: 540,
  characterClaims: "jsonl",
  aliasOf: "world-character/griffin-prince-ostevien",
} as const satisfies WorldCharacter

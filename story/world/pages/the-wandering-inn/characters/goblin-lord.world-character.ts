import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const goblinLord = {
  id: "01a0b70a-df44-7cca-8355-d9642163876d",
  type: "page-type/world-character",
  slug: "goblin-lord",
  title: "the Goblin Lord",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  firstChapter: 152,
  lastChapter: 298,
  characterClaims: "jsonl",
  aliasOf: "world-character/reiss",
  createdAt: "2026-09-19T00:22:18.180Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter

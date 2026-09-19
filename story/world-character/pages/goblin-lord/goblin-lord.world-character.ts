import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const goblinLord = {
  id: "01a0b70a-df44-7cca-8355-d9642163876d",
  type: "page-type/world-character",
  slug: "goblin-lord",
  title: "the Goblin Lord",
  world: "world/the-wandering-inn",
  firstChapter: 152,
  lastChapter: 756,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

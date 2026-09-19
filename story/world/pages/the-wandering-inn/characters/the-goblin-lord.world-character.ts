import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theGoblinLord = {
  id: "01a0b70d-1dd1-7a80-b125-8ac798960beb",
  type: "page-type/world-character",
  slug: "the-goblin-lord",
  title: "the Goblin Lord",
  world: "world/the-wandering-inn",
  firstChapter: 233,
  lastChapter: 233,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

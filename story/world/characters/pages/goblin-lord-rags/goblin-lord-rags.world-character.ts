import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const goblinLordRags = {
  id: "01a0b70a-df8f-7e4d-8481-16291912e707",
  type: "page-type/world-character",
  slug: "goblin-lord-rags",
  title: "Ragathsi of Civilizations",
  world: "world/the-wandering-inn",
  firstChapter: 747,
  lastChapter: 756,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

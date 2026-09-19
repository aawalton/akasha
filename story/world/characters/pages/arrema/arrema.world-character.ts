import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const arrema = {
  id: "01a0b707-72a4-75d7-82d7-36cbf40d106a",
  type: "page-type/world-character",
  slug: "arrema",
  title: "Arrema",
  world: "world/the-wandering-inn",
  firstChapter: 791,
  lastChapter: 791,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

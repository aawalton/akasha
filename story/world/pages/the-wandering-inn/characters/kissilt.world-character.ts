import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kissilt = {
  id: "01a0b70b-6d5c-759c-905e-a63547df05fd",
  type: "page-type/world-character",
  slug: "kissilt",
  title: "Kissilt",
  world: "world/the-wandering-inn",
  firstChapter: 381,
  lastChapter: 576,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

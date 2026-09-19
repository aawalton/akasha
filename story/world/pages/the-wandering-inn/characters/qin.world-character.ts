import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const qin = {
  id: "01a0b70c-7766-7815-909b-e2aefffd91f8",
  type: "page-type/world-character",
  slug: "qin",
  title: "Qin'tevf'al",
  world: "world/the-wandering-inn",
  firstChapter: 509,
  lastChapter: 509,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

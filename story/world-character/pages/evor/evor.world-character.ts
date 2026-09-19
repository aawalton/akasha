import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const evor = {
  id: "01a0b70a-7604-7906-b15a-19d0620bb506",
  type: "page-type/world-character",
  slug: "evor",
  title: "Evor",
  world: "world/the-wandering-inn",
  firstChapter: 815,
  lastChapter: 815,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

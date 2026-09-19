import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const cauwine = {
  id: "01a0b709-f563-7f33-b529-26da5bd3910c",
  type: "page-type/world-character",
  slug: "cauwine",
  title: "Cauwine",
  world: "world/the-wandering-inn",
  firstChapter: 581,
  lastChapter: 758,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const celinthe = {
  id: "01a0b709-f8c7-748c-8b96-037d4529e392",
  type: "page-type/world-character",
  slug: "celinthe",
  title: "Celinthe",
  world: "world/the-wandering-inn",
  firstChapter: 521,
  lastChapter: 521,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

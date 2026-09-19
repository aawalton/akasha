import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const veel = {
  id: "01a0b70d-89f1-748f-8108-1b17a8d6c3ad",
  type: "page-type/world-character",
  slug: "veel",
  title: "Veel",
  world: "world/the-wandering-inn",
  firstChapter: 322,
  lastChapter: 322,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

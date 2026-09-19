import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const spiderslicer = {
  id: "01a0b70d-0b86-7fab-ac35-1f8dbaee440a",
  type: "page-type/world-character",
  slug: "spiderslicer",
  title: "Spiderslicer",
  world: "world/the-wandering-inn",
  firstChapter: 304,
  lastChapter: 305,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

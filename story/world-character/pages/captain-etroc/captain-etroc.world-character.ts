import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const captainEtroc = {
  id: "01a0b707-9288-7a84-be23-b7a5f81456ce",
  type: "page-type/world-character",
  slug: "captain-etroc",
  title: "Captain Etroc d'Anametis",
  world: "world/the-wandering-inn",
  firstChapter: 786,
  lastChapter: 786,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

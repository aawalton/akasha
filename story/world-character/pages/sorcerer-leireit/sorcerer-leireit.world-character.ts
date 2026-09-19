import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sorcererLeireit = {
  id: "01a0b70d-0a08-704a-90a0-199720c8fb7c",
  type: "page-type/world-character",
  slug: "sorcerer-leireit",
  title: "Sorcerer Leireit",
  world: "world/the-wandering-inn",
  firstChapter: 815,
  lastChapter: 815,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

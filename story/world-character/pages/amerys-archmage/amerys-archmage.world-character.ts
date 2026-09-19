import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const amerysArchmage = {
  id: "01a0b707-6cf4-7196-b261-32dc52aba82e",
  type: "page-type/world-character",
  slug: "amerys-archmage",
  title: "Archmage Amerys",
  world: "world/the-wandering-inn",
  firstChapter: 431,
  lastChapter: 559,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

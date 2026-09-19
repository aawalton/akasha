import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const almanSanito = {
  id: "01a0b707-6a28-76ee-9157-8ccf09c5df45",
  type: "page-type/world-character",
  slug: "alman-sanito",
  title: "Alman Sanito",
  world: "world/the-wandering-inn",
  firstChapter: 628,
  lastChapter: 628,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

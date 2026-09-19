import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const leafpear = {
  id: "01a0b70b-7f05-7055-b823-c134f2ba839e",
  type: "page-type/world-character",
  slug: "leafpear",
  title: "Leafpear",
  world: "world/the-wandering-inn",
  firstChapter: 754,
  lastChapter: 754,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

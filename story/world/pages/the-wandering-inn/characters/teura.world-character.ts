import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const teura = {
  id: "01a0b70d-1a95-79cf-bfef-dba674fcec54",
  type: "page-type/world-character",
  slug: "teura",
  title: "Teura",
  world: "world/the-wandering-inn",
  firstChapter: 275,
  lastChapter: 771,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

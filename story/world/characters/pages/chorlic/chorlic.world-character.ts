import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const chorlic = {
  id: "01a0b709-ffdb-7a69-a58f-1906d250b717",
  type: "page-type/world-character",
  slug: "chorlic",
  title: "Wall Lord Chorlic",
  world: "world/the-wandering-inn",
  firstChapter: 792,
  lastChapter: 792,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

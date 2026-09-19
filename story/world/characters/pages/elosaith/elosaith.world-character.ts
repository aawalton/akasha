import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const elosaith = {
  id: "01a0b70a-66f3-786e-afbb-1008ccce8ddb",
  type: "page-type/world-character",
  slug: "elosaith",
  title: "Elosaith",
  world: "world/the-wandering-inn",
  firstChapter: 706,
  lastChapter: 707,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

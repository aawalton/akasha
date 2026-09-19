import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const dukeRhisveri = {
  id: "01a0b70a-1ed1-75f5-b09c-1d4a6888bfa9",
  type: "page-type/world-character",
  slug: "duke-rhisveri",
  title: "Rhisveri",
  world: "world/the-wandering-inn",
  firstChapter: 527,
  lastChapter: 527,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

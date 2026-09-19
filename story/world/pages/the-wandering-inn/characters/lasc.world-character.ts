import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lasc = {
  id: "01a0b70b-7d8b-7e04-ac4a-f675d2d575bd",
  type: "page-type/world-character",
  slug: "lasc",
  title: "Captain Lasc",
  world: "world/the-wandering-inn",
  firstChapter: 404,
  lastChapter: 404,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

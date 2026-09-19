import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const joseph = {
  id: "01a06580-2494-77c4-a003-b6b70aa179ea",
  type: "page-type/world-character",
  slug: "joseph",
  title: "Joseph",
  world: "world/the-wandering-inn",
  maxLevel: 16,
  eventCount: 13,
  firstChapter: 109,
  lastChapter: 779,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

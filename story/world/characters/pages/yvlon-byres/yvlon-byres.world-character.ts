import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const yvlonByres = {
  id: "01a06580-2495-7f5c-bb98-651c69ded5b4",
  type: "page-type/world-character",
  slug: "yvlon-byres",
  title: "Yvlon Byres",
  world: "world/the-wandering-inn",
  maxLevel: 37,
  eventCount: 8,
  firstChapter: 50,
  lastChapter: 798,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

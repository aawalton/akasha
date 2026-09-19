import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pekona = {
  id: "01a06580-2495-76a0-9240-9c1e564bd530",
  type: "page-type/world-character",
  slug: "pekona",
  title: "Pekona",
  world: "world/the-wandering-inn",
  maxLevel: 2,
  eventCount: 4,
  firstChapter: 185,
  lastChapter: 815,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

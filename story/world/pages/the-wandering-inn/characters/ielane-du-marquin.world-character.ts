import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ielaneDuMarquin = {
  id: "01a06580-2494-711d-8d7f-1c6ac6b639ce",
  type: "page-type/world-character",
  slug: "ielane-du-marquin",
  title: "Queen Ielane du Marquin",
  world: "world/the-wandering-inn",
  maxLevel: 44,
  eventCount: 2,
  firstChapter: 708,
  lastChapter: 774,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

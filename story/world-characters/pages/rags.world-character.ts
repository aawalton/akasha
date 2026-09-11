import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const rags = {
  id: "01a06580-2495-718b-aeda-9badee68b180",
  type: "world-character",
  slug: "rags",
  title: "Chieftain Rags",
  world: "the-wandering-inn",
  maxLevel: 35,
  eventCount: 27,
  firstChapter: 83,
  lastChapter: 613,
} as const satisfies WorldCharacter

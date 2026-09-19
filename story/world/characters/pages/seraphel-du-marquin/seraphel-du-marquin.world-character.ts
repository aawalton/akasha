import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const seraphelDuMarquin = {
  id: "01a06580-2495-7c47-a4b3-4fbc016c5cd9",
  type: "page-type/world-character",
  slug: "seraphel-du-marquin",
  title: "Seraphel du Marquin",
  world: "world/the-wandering-inn",
  maxLevel: 27,
  eventCount: 5,
  firstChapter: 540,
  lastChapter: 574,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

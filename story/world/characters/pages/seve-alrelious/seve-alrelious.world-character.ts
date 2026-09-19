import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const seveAlrelious = {
  id: "01a06580-2495-7b16-a11b-39363c0d037d",
  type: "page-type/world-character",
  slug: "seve-alrelious",
  title: "Seve-Alrelious",
  world: "world/the-wandering-inn",
  maxLevel: 46,
  eventCount: 3,
  firstChapter: 456,
  lastChapter: 698,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

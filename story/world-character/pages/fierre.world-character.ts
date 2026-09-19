import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const fierre = {
  id: "01a06580-2494-7123-b25b-4065b4caac03",
  type: "page-type/world-character",
  slug: "fierre",
  title: "Fierre",
  world: "world/the-wandering-inn",
  maxLevel: 3,
  eventCount: 2,
  firstChapter: 311,
  lastChapter: 592,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

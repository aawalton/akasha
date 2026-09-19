import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const insill = {
  id: "01a06580-2494-7d3e-a26e-8b621811dae0",
  type: "page-type/world-character",
  slug: "insill",
  title: "Insill",
  world: "world/the-wandering-inn",
  maxLevel: 28,
  eventCount: 2,
  firstChapter: 185,
  lastChapter: 364,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

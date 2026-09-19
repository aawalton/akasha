import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zailGemscale = {
  id: "01a06580-2495-72c4-90d0-82c39c88cce7",
  type: "page-type/world-character",
  slug: "zail-gemscale",
  title: "Wall Lord Zail Gemscale",
  world: "world/the-wandering-inn",
  maxLevel: 44,
  eventCount: 2,
  firstChapter: 662,
  lastChapter: 820,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

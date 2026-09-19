import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const halracEveram = {
  id: "01a06580-2494-7180-8da2-6f5bc8763993",
  type: "page-type/world-character",
  slug: "halrac-everam",
  title: "Halrac Everam",
  world: "world/the-wandering-inn",
  maxLevel: 36,
  eventCount: 8,
  firstChapter: 153,
  lastChapter: 752,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

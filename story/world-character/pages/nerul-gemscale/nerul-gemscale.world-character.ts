import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nerulGemscale = {
  id: "01a06580-2495-7c1a-b3fd-7fbbaae22f08",
  type: "page-type/world-character",
  slug: "nerul-gemscale",
  title: "Nerul Gemscale",
  world: "world/the-wandering-inn",
  maxLevel: 48,
  eventCount: 5,
  firstChapter: 824,
  lastChapter: 824,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

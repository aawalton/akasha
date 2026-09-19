import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ksmvr = {
  id: "01a06580-2494-7d42-8eb4-3482b0b04728",
  type: "page-type/world-character",
  slug: "ksmvr",
  title: "Ksmvr",
  world: "world/the-wandering-inn",
  maxLevel: 30,
  eventCount: 17,
  firstChapter: 104,
  lastChapter: 104,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

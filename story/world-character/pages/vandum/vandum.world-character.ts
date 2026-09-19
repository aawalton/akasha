import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const vandum = {
  id: "01a06580-2495-712c-a983-628df7c1d48a",
  type: "page-type/world-character",
  slug: "vandum",
  title: "Vandum",
  world: "world/the-wandering-inn",
  maxLevel: 50,
  eventCount: 4,
  firstChapter: 636,
  lastChapter: 671,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

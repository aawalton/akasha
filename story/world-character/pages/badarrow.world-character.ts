import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const badarrow = {
  id: "01a06580-2494-7ef7-a18c-8584e4cd9ecb",
  type: "page-type/world-character",
  slug: "badarrow",
  title: "Badarrow",
  world: "world/the-wandering-inn",
  maxLevel: 25,
  eventCount: 3,
  firstChapter: 143,
  lastChapter: 775,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const olesm = {
  id: "01a06580-2495-7c82-9dcf-360b73bf75ef",
  type: "page-type/world-character",
  slug: "olesm",
  title: "Olesm",
  world: "world/the-wandering-inn",
  maxLevel: 35,
  eventCount: 18,
  firstChapter: 19,
  lastChapter: 658,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

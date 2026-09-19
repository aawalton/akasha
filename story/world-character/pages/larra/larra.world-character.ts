import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const larra = {
  id: "01a06580-2494-7f37-8079-a65fa38caa17",
  type: "page-type/world-character",
  slug: "larra",
  title: "Larra",
  world: "world/the-wandering-inn",
  maxLevel: 48,
  eventCount: 3,
  firstChapter: 616,
  lastChapter: 619,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

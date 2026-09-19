import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theDemonessHaade = {
  id: "01a0b70d-1c6a-70f0-92f1-27a9df41b040",
  type: "page-type/world-character",
  slug: "the-demoness-haade",
  title: "the Demoness",
  world: "world/the-wandering-inn",
  firstChapter: 799,
  lastChapter: 799,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

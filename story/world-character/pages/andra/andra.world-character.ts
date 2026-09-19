import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const andra = {
  id: "01a0b707-6e4f-7318-8e85-bf549def70d5",
  type: "page-type/world-character",
  slug: "andra",
  title: "Andra",
  world: "world/the-wandering-inn",
  firstChapter: 676,
  lastChapter: 814,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bamer = {
  id: "01a0b707-7953-78a5-91e6-a57f6d26b572",
  type: "page-type/world-character",
  slug: "bamer",
  title: "Bamer",
  world: "world/the-wandering-inn",
  firstChapter: 312,
  lastChapter: 452,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

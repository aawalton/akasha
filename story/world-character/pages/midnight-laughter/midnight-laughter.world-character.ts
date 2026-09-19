import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const midnightLaughter = {
  id: "01a0b70b-eac0-7b2b-9d97-d238b01eea9e",
  type: "page-type/world-character",
  slug: "midnight-laughter",
  title: "Midnight's Laughter",
  world: "world/the-wandering-inn",
  firstChapter: 812,
  lastChapter: 812,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

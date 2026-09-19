import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const captainLidera = {
  id: "01a0b707-93c7-7d29-9902-1627bd033ecf",
  type: "page-type/world-character",
  slug: "captain-lidera",
  title: "Captain Lidera",
  world: "world/the-wandering-inn",
  firstChapter: 677,
  lastChapter: 677,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const captainAd = {
  id: "01a0b707-91c1-7b71-9481-049bb8b8dea7",
  type: "page-type/world-character",
  slug: "captain-ad",
  title: "Captain Ad",
  world: "world/the-wandering-inn",
  firstChapter: 239,
  lastChapter: 239,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

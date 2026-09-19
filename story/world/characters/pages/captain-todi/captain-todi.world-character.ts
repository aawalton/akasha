import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const captainTodi = {
  id: "01a0b707-94a0-7bf7-adb0-88f79b3e9d53",
  type: "page-type/world-character",
  slug: "captain-todi",
  title: "Captain Todi",
  world: "world/the-wandering-inn",
  firstChapter: 708,
  lastChapter: 763,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

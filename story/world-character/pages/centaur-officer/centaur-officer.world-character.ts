import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const centaurOfficer = {
  id: "01a0b709-f933-7afc-a8bf-ab6fb306cc83",
  type: "page-type/world-character",
  slug: "centaur-officer",
  title: "Centaur officer",
  world: "world/the-wandering-inn",
  firstChapter: 196,
  lastChapter: 196,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

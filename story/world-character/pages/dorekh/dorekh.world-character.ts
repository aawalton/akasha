import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dorekh = {
  id: "01a0b70a-1b17-7ea7-b4fd-111655ecc724",
  type: "page-type/world-character",
  slug: "dorekh",
  title: "Dorekh",
  world: "world/the-wandering-inn",
  firstChapter: 584,
  lastChapter: 584,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

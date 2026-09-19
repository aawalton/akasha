import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const elohi = {
  id: "01a0b70a-661b-78e6-9a39-9028e4a134ad",
  type: "page-type/world-character",
  slug: "elohi",
  title: "Elohi",
  world: "world/the-wandering-inn",
  firstChapter: 805,
  lastChapter: 805,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

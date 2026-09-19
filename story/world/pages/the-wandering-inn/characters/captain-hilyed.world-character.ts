import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const captainHilyed = {
  id: "01a0b707-92f5-71e4-ac35-9b1435ee7bda",
  type: "page-type/world-character",
  slug: "captain-hilyed",
  title: "Hilyed",
  world: "world/the-wandering-inn",
  firstChapter: 791,
  lastChapter: 791,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

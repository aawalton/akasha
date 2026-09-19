import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const captainThin = {
  id: "01a0b707-9470-7cc6-9023-152931e07208",
  type: "page-type/world-character",
  slug: "captain-thin",
  title: "Captain Thin",
  world: "world/the-wandering-inn",
  firstChapter: 799,
  lastChapter: 799,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

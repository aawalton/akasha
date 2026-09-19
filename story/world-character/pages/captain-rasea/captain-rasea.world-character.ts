import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const captainRasea = {
  id: "01a0b707-93fe-73cf-b27c-797482c58ada",
  type: "page-type/world-character",
  slug: "captain-rasea",
  title: "Captain Rasea Zecrew",
  world: "world/the-wandering-inn",
  firstChapter: 418,
  lastChapter: 418,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

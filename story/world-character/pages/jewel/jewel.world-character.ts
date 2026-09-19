import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const jewel = {
  id: "01a0b70b-1fa1-7e21-a468-0982ff80a5b9",
  type: "page-type/world-character",
  slug: "jewel",
  title: "Jewel",
  world: "world/the-wandering-inn",
  firstChapter: 588,
  lastChapter: 747,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

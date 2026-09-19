import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const queravia = {
  id: "01a0b70c-7bb1-7609-8bb8-cea0a86b82b2",
  type: "page-type/world-character",
  slug: "queravia",
  title: "Queravia",
  world: "world/the-wandering-inn",
  firstChapter: 181,
  lastChapter: 372,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

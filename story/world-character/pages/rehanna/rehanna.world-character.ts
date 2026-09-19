import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rehanna = {
  id: "01a0b70c-8c65-7d6c-8575-4f211b09a137",
  type: "page-type/world-character",
  slug: "rehanna",
  title: "Rehanna",
  world: "world/the-wandering-inn",
  firstChapter: 204,
  lastChapter: 359,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

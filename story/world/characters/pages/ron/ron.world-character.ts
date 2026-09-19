import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ron = {
  id: "01a0b70c-9c82-73e1-8b54-583ede5604e6",
  type: "page-type/world-character",
  slug: "ron",
  title: "Ron",
  world: "world/the-wandering-inn",
  firstChapter: 97,
  lastChapter: 97,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

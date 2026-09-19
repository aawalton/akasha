import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hickery = {
  id: "01a0b70a-fb88-7489-b374-bc0e16642ea9",
  type: "page-type/world-character",
  slug: "hickery",
  title: "Hickery",
  world: "world/the-wandering-inn",
  firstChapter: 525,
  lastChapter: 525,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

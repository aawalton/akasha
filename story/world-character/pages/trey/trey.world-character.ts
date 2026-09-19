import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const trey = {
  id: "01a0b70d-703c-754c-a6a2-681952b2d7f1",
  type: "page-type/world-character",
  slug: "trey",
  title: "Trey",
  world: "world/the-wandering-inn",
  firstChapter: 92,
  lastChapter: 735,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

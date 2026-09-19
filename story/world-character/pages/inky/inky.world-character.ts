import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const inky = {
  id: "01a0b70b-0d0f-72b8-aeee-31b81c8927e2",
  type: "page-type/world-character",
  slug: "inky",
  title: "Inky",
  world: "world/the-wandering-inn",
  firstChapter: 417,
  lastChapter: 417,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const clara = {
  id: "01a0b70a-02f8-7f06-9808-063dab336d21",
  type: "page-type/world-character",
  slug: "clara",
  title: "Clara",
  world: "world/the-wandering-inn",
  firstChapter: 130,
  lastChapter: 131,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

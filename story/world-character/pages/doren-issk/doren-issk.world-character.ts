import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dorenIssk = {
  id: "01a0b70a-1b4d-758d-b5e9-d7ca3a7aede3",
  type: "page-type/world-character",
  slug: "doren-issk",
  title: "Doren",
  world: "world/the-wandering-inn",
  firstChapter: 769,
  lastChapter: 769,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sophridel = {
  id: "01a0b70d-09d0-7854-9316-7d5b275453c3",
  type: "page-type/world-character",
  slug: "sophridel",
  title: "Sophridel",
  world: "world/the-wandering-inn",
  firstChapter: 533,
  lastChapter: 596,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

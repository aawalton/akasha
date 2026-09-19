import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const doubte = {
  id: "01a0b70a-1c17-7f3c-aa0e-a8fc427041bc",
  type: "page-type/world-character",
  slug: "doubte",
  title: "Doubte",
  world: "world/the-wandering-inn",
  firstChapter: 733,
  lastChapter: 735,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

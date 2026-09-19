import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const vincent = {
  id: "01a0b70d-9440-703b-826b-02aeb866868b",
  type: "page-type/world-character",
  slug: "vincent",
  title: "Vincent",
  world: "world/the-wandering-inn",
  firstChapter: 97,
  lastChapter: 215,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

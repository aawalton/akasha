import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const toumaTheGreat = {
  id: "01a0b70d-6f4c-7fc0-84cd-b97c62b67111",
  type: "page-type/world-character",
  slug: "touma-the-great",
  title: "Touma the Great",
  world: "world/the-wandering-inn",
  firstChapter: 532,
  lastChapter: 532,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

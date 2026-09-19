import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const thift = {
  id: "01a0b70d-2617-7439-b63e-7354678325b2",
  type: "page-type/world-character",
  slug: "thift",
  title: "Thift",
  world: "world/the-wandering-inn",
  firstChapter: 389,
  lastChapter: 389,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

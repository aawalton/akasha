import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const torthe = {
  id: "01a0b70d-6f12-7595-8789-cffd23317a90",
  type: "page-type/world-character",
  slug: "torthe",
  title: "Torthe Suorloks",
  world: "world/the-wandering-inn",
  firstChapter: 647,
  lastChapter: 661,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

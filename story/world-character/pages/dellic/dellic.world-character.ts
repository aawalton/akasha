import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dellic = {
  id: "01a0b70a-165a-7790-b476-e7f3412757f2",
  type: "page-type/world-character",
  slug: "dellic",
  title: "Dellic",
  world: "world/the-wandering-inn",
  firstChapter: 457,
  lastChapter: 457,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

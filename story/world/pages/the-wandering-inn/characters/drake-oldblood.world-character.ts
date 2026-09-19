import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const drakeOldblood = {
  id: "01a0b70a-1cd4-78a2-8b2c-1590673d744a",
  type: "page-type/world-character",
  slug: "drake-oldblood",
  title: "Drake",
  world: "world/the-wandering-inn",
  firstChapter: 361,
  lastChapter: 361,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

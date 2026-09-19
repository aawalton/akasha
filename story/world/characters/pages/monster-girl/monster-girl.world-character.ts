import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const monsterGirl = {
  id: "01a0b70b-f350-7ca9-8ae0-d8b12963fe14",
  type: "page-type/world-character",
  slug: "monster-girl",
  title: "the creature in the snow",
  world: "world/the-wandering-inn",
  firstChapter: 145,
  lastChapter: 146,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const raidpear = {
  id: "01a0b70c-8627-7fa3-9a46-f9ef42ad80d8",
  type: "page-type/world-character",
  slug: "raidpear",
  title: "Raidpear",
  world: "world/the-wandering-inn",
  firstChapter: 395,
  lastChapter: 395,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

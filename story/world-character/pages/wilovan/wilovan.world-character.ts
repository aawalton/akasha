import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wilovan = {
  id: "01a0b70d-9e9b-7dc2-a3ee-9e3dd11e0b37",
  type: "page-type/world-character",
  slug: "wilovan",
  title: "Wilovan",
  world: "world/the-wandering-inn",
  firstChapter: 450,
  lastChapter: 628,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

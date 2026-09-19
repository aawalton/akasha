import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const neirute = {
  id: "01a0b70c-040f-7536-a34a-01603babe934",
  type: "page-type/world-character",
  slug: "neirute",
  title: "Neirute",
  world: "world/the-wandering-inn",
  firstChapter: 733,
  lastChapter: 733,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

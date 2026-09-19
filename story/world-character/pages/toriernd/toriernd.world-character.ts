import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const toriernd = {
  id: "01a0b70d-6daa-7f8b-8324-24287f033d2a",
  type: "page-type/world-character",
  slug: "toriernd",
  title: "Toriernd",
  world: "world/the-wandering-inn",
  firstChapter: 660,
  lastChapter: 660,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

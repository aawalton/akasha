import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const halracTheGrim = {
  id: "01a0b70a-f08b-72f5-9ae6-8b356adf7e6a",
  type: "page-type/world-character",
  slug: "halrac-the-grim",
  title: "Halrac",
  world: "world/the-wandering-inn",
  firstChapter: 248,
  lastChapter: 506,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

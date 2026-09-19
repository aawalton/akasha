import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const admiralMaxy = {
  id: "01a0b707-63f3-7c42-b0b8-67ee35210c75",
  type: "page-type/world-character",
  slug: "admiral-maxy",
  title: "Maxy",
  world: "world/the-wandering-inn",
  firstChapter: 712,
  lastChapter: 712,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

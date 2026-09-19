import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gamurTheAxe = {
  id: "01a0b70a-9062-7aa2-821d-aa71f6a5c359",
  type: "page-type/world-character",
  slug: "gamur-the-axe",
  title: "Gamur",
  world: "world/the-wandering-inn",
  firstChapter: 660,
  lastChapter: 661,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

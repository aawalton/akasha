import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const iradoren = {
  id: "01a0b70b-1094-76aa-91fc-1fcebb5efbb6",
  type: "page-type/world-character",
  slug: "iradoren",
  title: "Iradoren",
  world: "world/the-wandering-inn",
  firstChapter: 676,
  lastChapter: 685,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

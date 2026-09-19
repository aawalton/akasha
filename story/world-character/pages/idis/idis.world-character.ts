import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const idis = {
  id: "01a0b70b-0380-79b6-b72d-f2ea2635c501",
  type: "page-type/world-character",
  slug: "idis",
  title: "Idis",
  world: "world/the-wandering-inn",
  firstChapter: 546,
  lastChapter: 618,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

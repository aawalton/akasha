import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const losmere = {
  id: "01a0b70b-8ced-740b-9dc2-7f745a896f38",
  type: "page-type/world-character",
  slug: "losmere",
  title: "Losmere",
  world: "world/the-wandering-inn",
  firstChapter: 823,
  lastChapter: 823,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

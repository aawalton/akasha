import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const darsul = {
  id: "01a0b70a-1319-7690-83ec-a36061be7e4a",
  type: "page-type/world-character",
  slug: "darsul",
  title: "Darsul",
  world: "world/the-wandering-inn",
  firstChapter: 487,
  lastChapter: 487,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

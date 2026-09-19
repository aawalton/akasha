import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ylss = {
  id: "01a0b70d-e183-7b50-977e-bc755eed571f",
  type: "page-type/world-character",
  slug: "ylss",
  title: "Ylss",
  world: "world/the-wandering-inn",
  firstChapter: 44,
  lastChapter: 44,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

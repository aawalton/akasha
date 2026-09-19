import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const cuska = {
  id: "01a0b70a-0d13-7e89-bc5d-f54bd77683f2",
  type: "page-type/world-character",
  slug: "cuska",
  title: "Cuska",
  world: "world/the-wandering-inn",
  firstChapter: 815,
  lastChapter: 815,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

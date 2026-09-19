import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const seborn = {
  id: "01a0b70c-ed29-7786-8936-02603ee631fa",
  type: "page-type/world-character",
  slug: "seborn",
  title: "Seborn",
  world: "world/the-wandering-inn",
  firstChapter: 96,
  lastChapter: 810,
  characterClaims: "jsonl",
  aliasOf: "world-character/seborn-sailwinds",
} as const satisfies WorldCharacter

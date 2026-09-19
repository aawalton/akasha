import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const furgatherer = {
  id: "01a0b70a-8dfc-7621-9df0-3286f075cce8",
  type: "page-type/world-character",
  slug: "furgatherer",
  title: "Furgatherer",
  world: "world/the-wandering-inn",
  firstChapter: 303,
  lastChapter: 303,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

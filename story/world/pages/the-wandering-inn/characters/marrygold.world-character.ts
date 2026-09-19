import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const marrygold = {
  id: "01a0b70b-9c84-7f16-b5b5-b6d78fd6f1ba",
  type: "page-type/world-character",
  slug: "marrygold",
  title: "Marrygold",
  world: "world/the-wandering-inn",
  firstChapter: 822,
  lastChapter: 822,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

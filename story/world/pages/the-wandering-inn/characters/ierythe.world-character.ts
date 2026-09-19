import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ierythe = {
  id: "01a0b70b-06a5-786e-bec6-eed22cc8ec3b",
  type: "page-type/world-character",
  slug: "ierythe",
  title: "Ierythe",
  world: "world/the-wandering-inn",
  firstChapter: 606,
  lastChapter: 606,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

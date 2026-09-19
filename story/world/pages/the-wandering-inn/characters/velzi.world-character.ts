import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const velzi = {
  id: "01a0b70d-8b7f-7544-9771-431b37f02264",
  type: "page-type/world-character",
  slug: "velzi",
  title: "Velzi",
  world: "world/the-wandering-inn",
  firstChapter: 509,
  lastChapter: 509,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

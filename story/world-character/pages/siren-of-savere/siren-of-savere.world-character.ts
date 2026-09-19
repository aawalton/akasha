import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sirenOfSavere = {
  id: "01a0b70d-0326-7613-86c6-f350c8c977db",
  type: "page-type/world-character",
  slug: "siren-of-savere",
  title: "the Siren of Savere",
  world: "world/the-wandering-inn",
  firstChapter: 527,
  lastChapter: 636,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

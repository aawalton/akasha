import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const edward = {
  id: "01a0b70a-2383-7d7d-97e8-fddffe8376a2",
  type: "page-type/world-character",
  slug: "edward",
  title: "Edward (Eddy)",
  world: "world/the-wandering-inn",
  firstChapter: 97,
  lastChapter: 97,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

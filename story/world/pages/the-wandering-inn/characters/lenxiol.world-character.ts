import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lenxiol = {
  id: "01a0b70b-8133-73a2-ae47-b6c607e5a6e1",
  type: "page-type/world-character",
  slug: "lenxiol",
  title: "Lenxiol",
  world: "world/the-wandering-inn",
  firstChapter: 797,
  lastChapter: 798,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

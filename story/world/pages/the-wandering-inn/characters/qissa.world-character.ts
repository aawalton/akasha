import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const qissa = {
  id: "01a0b70c-77d5-7f58-bb00-2f358d41501d",
  type: "page-type/world-character",
  slug: "qissa",
  title: "Watch Captain Qissa",
  world: "world/the-wandering-inn",
  firstChapter: 697,
  lastChapter: 793,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

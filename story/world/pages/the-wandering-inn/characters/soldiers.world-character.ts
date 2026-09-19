import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const soldiers = {
  id: "01a0b70d-083a-7b7d-87ef-5823f8f02b5d",
  type: "page-type/world-character",
  slug: "soldiers",
  title: "Soldiers",
  world: "world/the-wandering-inn",
  firstChapter: 147,
  lastChapter: 148,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

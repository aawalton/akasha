import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nathald = {
  id: "01a0b70c-0244-7663-89a8-0a02c87ab12e",
  type: "page-type/world-character",
  slug: "nathald",
  title: "Sir Nathald",
  world: "world/the-wandering-inn",
  firstChapter: 337,
  lastChapter: 337,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

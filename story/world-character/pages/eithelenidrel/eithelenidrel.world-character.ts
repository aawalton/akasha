import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eithelenidrel = {
  id: "01a0b70a-2455-7eb6-bd9b-7eb3e2c2efce",
  type: "page-type/world-character",
  slug: "eithelenidrel",
  title: "Eithelenidrel",
  world: "world/the-wandering-inn",
  firstChapter: 709,
  lastChapter: 709,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const merec = {
  id: "01a0b70b-e87f-77a4-9b01-202c63aed8bc",
  type: "page-type/world-character",
  slug: "merec",
  title: "Merec",
  world: "world/the-wandering-inn",
  firstChapter: 170,
  lastChapter: 170,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

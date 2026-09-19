import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theilo = {
  id: "01a0b70d-22e0-78c8-9fe1-ee6574f60eaf",
  type: "page-type/world-character",
  slug: "theilo",
  title: "Theilo",
  world: "world/the-wandering-inn",
  firstChapter: 618,
  lastChapter: 618,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

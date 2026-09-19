import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const caroline = {
  id: "01a0b709-f4e1-7c46-90e7-539ba59cfcb2",
  type: "page-type/world-character",
  slug: "caroline",
  title: "Caroline",
  world: "world/the-wandering-inn",
  firstChapter: 775,
  lastChapter: 775,
} as const satisfies WorldCharacter

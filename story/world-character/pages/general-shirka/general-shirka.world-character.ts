import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const generalShirka = {
  id: "01a0b70a-95f4-796f-b317-5fcdd54c9bcb",
  type: "page-type/world-character",
  slug: "general-shirka",
  title: "General Shirka",
  world: "world/the-wandering-inn",
  firstChapter: 763,
  lastChapter: 763,
} as const satisfies WorldCharacter

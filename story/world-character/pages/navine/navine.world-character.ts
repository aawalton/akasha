import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const navine = {
  id: "01a0b70c-02b6-71e5-a62e-a1694db6c8b4",
  type: "page-type/world-character",
  slug: "navine",
  title: "Navine",
  world: "world/the-wandering-inn",
  firstChapter: 366,
  lastChapter: 663,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const isodore = {
  id: "01a0b70b-1506-70aa-ab0f-7b9529540891",
  type: "page-type/world-character",
  slug: "isodore",
  title: "Isodore",
  world: "world/the-wandering-inn",
  firstChapter: 217,
  lastChapter: 625,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

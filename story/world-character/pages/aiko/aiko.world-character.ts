import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const aiko = {
  id: "01a0b707-6628-772d-b4d6-fa72f582402f",
  type: "page-type/world-character",
  slug: "aiko",
  title: "Aiko",
  world: "world/the-wandering-inn",
  firstChapter: 196,
  lastChapter: 317,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const genviere = {
  id: "01a0b70a-9a75-72f3-9451-c882246860e2",
  type: "page-type/world-character",
  slug: "genviere",
  title: "Genviere",
  world: "world/the-wandering-inn",
  firstChapter: 291,
  lastChapter: 291,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

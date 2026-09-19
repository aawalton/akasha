import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const anabelle = {
  id: "01a0b707-6d4f-7df6-bbb0-63fe789de68b",
  type: "page-type/world-character",
  slug: "anabelle",
  title: "Anabelle",
  world: "world/the-wandering-inn",
  firstChapter: 174,
  lastChapter: 174,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

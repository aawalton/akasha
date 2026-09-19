import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bearbones = {
  id: "01a0b707-7d0a-7b8d-b441-188a01cd749a",
  type: "page-type/world-character",
  slug: "bearbones",
  title: "Bearbones",
  world: "world/the-wandering-inn",
  firstChapter: 552,
  lastChapter: 552,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

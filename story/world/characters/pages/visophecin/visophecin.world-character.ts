import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const visophecin = {
  id: "01a0b70d-95a3-7a56-ac81-f6ecd1c39da6",
  type: "page-type/world-character",
  slug: "visophecin",
  title: "Visophecin",
  world: "world/the-wandering-inn",
  firstChapter: 544,
  lastChapter: 776,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

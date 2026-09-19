import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const minerva = {
  id: "01a0b70b-ec13-76d1-b9cd-ac7fa54c5acb",
  type: "page-type/world-character",
  slug: "minerva",
  title: "Minerva",
  world: "world/the-wandering-inn",
  firstChapter: 273,
  lastChapter: 273,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

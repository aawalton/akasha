import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lordPazeral = {
  id: "01a0b70b-8ab7-723b-bc59-b544739b8f6b",
  type: "page-type/world-character",
  slug: "lord-pazeral",
  title: "Pazeral",
  world: "world/the-wandering-inn",
  firstChapter: 682,
  lastChapter: 682,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

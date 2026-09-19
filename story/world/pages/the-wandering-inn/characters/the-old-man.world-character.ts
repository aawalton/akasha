import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theOldMan = {
  id: "01a0b70d-1fab-75ee-826f-42f699d544bf",
  type: "page-type/world-character",
  slug: "the-old-man",
  title: "the elderly figure",
  world: "world/the-wandering-inn",
  firstChapter: 43,
  lastChapter: 43,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

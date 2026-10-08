import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const minotaurCommander = {
  id: "01a0b70b-ec84-77a1-89eb-92af74d38af8",
  type: "page-type/world-character",
  slug: "minotaur-commander",
  title: "the Minotaur commander",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 453,
  lastChapter: 453,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:27.108Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter

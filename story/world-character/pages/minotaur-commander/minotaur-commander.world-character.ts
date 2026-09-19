import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const minotaurCommander = {
  id: "01a0b70b-ec84-77a1-89eb-92af74d38af8",
  type: "page-type/world-character",
  slug: "minotaur-commander",
  title: "the Minotaur commander",
  world: "world/the-wandering-inn",
  firstChapter: 453,
  lastChapter: 453,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

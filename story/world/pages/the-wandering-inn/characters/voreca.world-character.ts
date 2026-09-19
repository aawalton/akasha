import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const voreca = {
  id: "01a0b70d-9744-73ad-bffe-783bc97e538c",
  type: "page-type/world-character",
  slug: "voreca",
  title: "Voreca",
  world: "world/the-wandering-inn",
  firstChapter: 709,
  lastChapter: 709,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

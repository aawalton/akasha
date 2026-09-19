import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sirMolte = {
  id: "01a0b70d-0246-76cf-9ea8-b2e83507b07f",
  type: "page-type/world-character",
  slug: "sir-molte",
  title: "Molte",
  world: "world/the-wandering-inn",
  firstChapter: 336,
  lastChapter: 336,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

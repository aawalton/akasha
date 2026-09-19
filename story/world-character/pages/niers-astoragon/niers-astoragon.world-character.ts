import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const niersAstoragon = {
  id: "01a0b70c-0929-7582-9326-0920584afa37",
  type: "page-type/world-character",
  slug: "niers-astoragon",
  title: "Niers Astoragon",
  world: "world/the-wandering-inn",
  firstChapter: 88,
  lastChapter: 823,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const mihaelaGodfrey = {
  id: "01a0b70b-eb68-7315-80da-93d06fcbd4fc",
  type: "page-type/world-character",
  slug: "mihaela-godfrey",
  title: "Mihaela Godfrey",
  world: "world/the-wandering-inn",
  firstChapter: 451,
  lastChapter: 627,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

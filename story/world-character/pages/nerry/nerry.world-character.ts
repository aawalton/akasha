import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nerry = {
  id: "01a0b70c-05d7-7f50-921e-78a118e219ac",
  type: "page-type/world-character",
  slug: "nerry",
  title: "Nerry",
  world: "world/the-wandering-inn",
  firstChapter: 627,
  lastChapter: 776,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

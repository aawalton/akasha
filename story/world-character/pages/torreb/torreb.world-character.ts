import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const torreb = {
  id: "01a0b70d-6e9b-797a-915f-3d969e231158",
  type: "page-type/world-character",
  slug: "torreb",
  title: "Torreb",
  world: "world/the-wandering-inn",
  firstChapter: 670,
  lastChapter: 671,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

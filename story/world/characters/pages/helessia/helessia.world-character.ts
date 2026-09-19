import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const helessia = {
  id: "01a0b70a-f845-7ee5-ad31-c430be7ba259",
  type: "page-type/world-character",
  slug: "helessia",
  title: "Helessia",
  world: "world/the-wandering-inn",
  firstChapter: 366,
  lastChapter: 663,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

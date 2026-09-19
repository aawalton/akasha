import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const alcaz = {
  id: "01a0b707-6777-7630-b221-6a9c745b1ecd",
  type: "page-type/world-character",
  slug: "alcaz",
  title: "Alcaz",
  world: "world/the-wandering-inn",
  firstChapter: 597,
  lastChapter: 689,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

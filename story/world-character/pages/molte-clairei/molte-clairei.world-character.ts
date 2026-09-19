import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const molteClairei = {
  id: "01a0b70b-f16f-75b8-9094-0899d811ad0e",
  type: "page-type/world-character",
  slug: "molte-clairei",
  title: "Sir Molte",
  world: "world/the-wandering-inn",
  firstChapter: 337,
  lastChapter: 337,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

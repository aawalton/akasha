import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kasignaMaiden = {
  id: "01a0b70b-240a-75c4-ba9f-4cfd1d7aaa25",
  type: "page-type/world-character",
  slug: "kasigna-maiden",
  title: "the Maiden",
  world: "world/the-wandering-inn",
  firstChapter: 741,
  lastChapter: 754,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

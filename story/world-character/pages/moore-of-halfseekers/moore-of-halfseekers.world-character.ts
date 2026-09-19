import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const mooreOfHalfseekers = {
  id: "01a0b70b-f76c-73cf-ad58-349604bb4329",
  type: "page-type/world-character",
  slug: "moore-of-halfseekers",
  title: "Moore",
  world: "world/the-wandering-inn",
  firstChapter: 785,
  lastChapter: 785,
  characterClaims: "jsonl",
  aliasOf: "world-character/moore",
} as const satisfies WorldCharacter

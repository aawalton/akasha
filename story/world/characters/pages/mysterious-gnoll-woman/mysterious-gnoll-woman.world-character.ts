import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mysteriousGnollWoman = {
  id: "01a0b70b-fbc5-7c52-bb27-849dc2e25206",
  type: "page-type/world-character",
  slug: "mysterious-gnoll-woman",
  title: "a strange Gnoll woman",
  world: "world/the-wandering-inn",
  firstChapter: 497,
  lastChapter: 497,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const centaurArcher = {
  id: "01a0b709-f8fe-7516-8cff-5a537439a76a",
  type: "page-type/world-character",
  slug: "centaur-archer",
  title: "the Centaur archer",
  world: "world/the-wandering-inn",
  firstChapter: 130,
  lastChapter: 130,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

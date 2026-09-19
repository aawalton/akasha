import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const othiusIv = {
  id: "01a0b70c-1f2c-7481-b15b-04fa742fbb5f",
  type: "page-type/world-character",
  slug: "othius-iv",
  title: "Othius the Fourth",
  world: "world/the-wandering-inn",
  firstChapter: 97,
  lastChapter: 711,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

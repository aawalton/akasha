import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const arthurYoung = {
  id: "01a0b707-730e-7ab3-b8b1-3578f9ee3634",
  type: "page-type/world-character",
  slug: "arthur-young",
  title: "Arthur",
  world: "world/the-wandering-inn",
  firstChapter: 481,
  lastChapter: 481,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const garsineWallbreaker = {
  id: "01a0b70a-9360-704c-83b1-c46861c48b12",
  type: "page-type/world-character",
  slug: "garsine-wallbreaker",
  title: "Garsine",
  world: "world/the-wandering-inn",
  firstChapter: 520,
  lastChapter: 535,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

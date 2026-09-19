import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const faeSpringCourt = {
  id: "01a0b70a-78e5-7664-8ad5-b6f688bf901e",
  type: "page-type/world-character",
  slug: "fae-spring-court",
  title: "the fae / fair folk",
  world: "world/the-wandering-inn",
  firstChapter: 252,
  lastChapter: 252,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

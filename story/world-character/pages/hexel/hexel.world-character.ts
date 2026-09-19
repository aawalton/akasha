import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hexel = {
  id: "01a0b70a-fad0-797d-b0ba-3e30c1b00be2",
  type: "page-type/world-character",
  slug: "hexel",
  title: "Hexel",
  world: "world/the-wandering-inn",
  firstChapter: 459,
  lastChapter: 706,
  characterClaims: "jsonl",
  aliasOf: "world-character/hexel-quithail",
} as const satisfies WorldCharacter

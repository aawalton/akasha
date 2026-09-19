import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hexelQuithail = {
  id: "01a0b70a-fb0b-7271-becb-d98a31948b78",
  type: "page-type/world-character",
  slug: "hexel-quithail",
  title: "Hexel Quithail",
  world: "world/the-wandering-inn",
  firstChapter: 421,
  lastChapter: 424,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

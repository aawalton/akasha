import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const flynn = {
  id: "01a0b70a-8aea-7723-b3f1-b7963d5cf068",
  type: "page-type/world-character",
  slug: "flynn",
  title: "Flynn",
  world: "world/the-wandering-inn",
  firstChapter: 571,
  lastChapter: 775,
  characterClaims: "jsonl",
  aliasOf: "world-character/flynn-patel",
} as const satisfies WorldCharacter

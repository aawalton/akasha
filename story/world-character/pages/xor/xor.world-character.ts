import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const xor = {
  id: "01a0b70d-d84f-7008-ae8f-4f8ad5303791",
  type: "page-type/world-character",
  slug: "xor",
  title: "Xor",
  world: "world/the-wandering-inn",
  firstChapter: 195,
  lastChapter: 195,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

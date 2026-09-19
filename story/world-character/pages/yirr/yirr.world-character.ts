import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const yirr = {
  id: "01a0b70d-dd5f-7aaa-aeb5-a55655aad067",
  type: "page-type/world-character",
  slug: "yirr",
  title: "Yirr",
  world: "world/the-wandering-inn",
  firstChapter: 772,
  lastChapter: 772,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

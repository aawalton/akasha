import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const deilanEl = {
  id: "01a0b70a-1425-7366-8233-56c62556075c",
  type: "page-type/world-character",
  slug: "deilan-el",
  title: "Lord Deilan El",
  world: "world/the-wandering-inn",
  firstChapter: 416,
  lastChapter: 474,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

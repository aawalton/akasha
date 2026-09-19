import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dameTalia = {
  id: "01a0b70a-1001-74f1-bef4-50d05ccb6d9a",
  type: "page-type/world-character",
  slug: "dame-talia",
  title: "Dame Talia",
  world: "world/the-wandering-inn",
  firstChapter: 360,
  lastChapter: 527,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

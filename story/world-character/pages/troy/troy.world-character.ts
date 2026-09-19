import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const troy = {
  id: "01a0b70d-72e4-7a18-bffe-5b34a7948120",
  type: "page-type/world-character",
  slug: "troy",
  title: "Troy",
  world: "world/the-wandering-inn",
  firstChapter: 109,
  lastChapter: 109,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

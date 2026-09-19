import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const marquin = {
  id: "01a0b70b-9aa9-7fcb-b35c-e36219fd3e94",
  type: "page-type/world-character",
  slug: "marquin",
  title: "Marquin",
  world: "world/the-wandering-inn",
  firstChapter: 569,
  lastChapter: 582,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

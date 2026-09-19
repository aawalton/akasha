import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const frostFaerie = {
  id: "01a0b70a-8d59-7ae7-bdb2-36dc5ba0b4b7",
  type: "page-type/world-character",
  slug: "frost-faerie",
  title: "the small Frost Faerie",
  world: "world/the-wandering-inn",
  firstChapter: 91,
  lastChapter: 91,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

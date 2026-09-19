import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const blackguard = {
  id: "01a0b707-869a-7cfa-911b-32f650a6dd8d",
  type: "page-type/world-character",
  slug: "blackguard",
  title: "the escort",
  world: "world/the-wandering-inn",
  firstChapter: 347,
  lastChapter: 347,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

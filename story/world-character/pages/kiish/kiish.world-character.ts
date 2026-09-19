import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kiish = {
  id: "01a0b70b-6a24-7ee4-8357-708819997f27",
  type: "page-type/world-character",
  slug: "kiish",
  title: "Kiish",
  world: "world/the-wandering-inn",
  firstChapter: 592,
  lastChapter: 592,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

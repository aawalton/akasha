import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const firstKingAvel = {
  id: "01a0b70a-8926-7df3-b336-a8859b3e81c4",
  type: "page-type/world-character",
  slug: "first-king-avel",
  title: "the First King of Avel",
  world: "world/the-wandering-inn",
  firstChapter: 523,
  lastChapter: 523,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

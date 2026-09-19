import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const batman = {
  id: "01a0b707-7c53-723a-b22b-94416ba17fc0",
  type: "page-type/world-character",
  slug: "batman",
  title: "batman",
  world: "world/the-wandering-inn",
  firstChapter: 67,
  lastChapter: 67,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

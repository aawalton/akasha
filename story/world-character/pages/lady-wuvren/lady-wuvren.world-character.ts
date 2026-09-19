import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ladyWuvren = {
  id: "01a0b70b-75fe-78f7-83c8-140fee71061d",
  type: "page-type/world-character",
  slug: "lady-wuvren",
  title: "Wuvren",
  world: "world/the-wandering-inn",
  firstChapter: 338,
  lastChapter: 416,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

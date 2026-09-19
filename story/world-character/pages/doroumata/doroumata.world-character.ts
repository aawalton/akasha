import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const doroumata = {
  id: "01a0b70a-1be8-7af8-aedd-c8d794c0bf2b",
  type: "page-type/world-character",
  slug: "doroumata",
  title: "Depth Magus Doroumata",
  world: "world/the-wandering-inn",
  firstChapter: 558,
  lastChapter: 591,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

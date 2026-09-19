import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const hunt = {
  id: "01a0b70b-0321-7048-a8fc-8a6c1df3957c",
  type: "page-type/world-character",
  slug: "hunt",
  title: "Hunt",
  world: "world/the-wandering-inn",
  firstChapter: 61,
  lastChapter: 61,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

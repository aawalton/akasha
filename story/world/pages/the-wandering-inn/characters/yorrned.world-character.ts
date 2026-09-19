import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const yorrned = {
  id: "01a0b70d-e1fc-7cc1-a439-0d00a7ed016c",
  type: "page-type/world-character",
  slug: "yorrned",
  title: "Yorrned",
  world: "world/the-wandering-inn",
  firstChapter: 692,
  lastChapter: 692,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

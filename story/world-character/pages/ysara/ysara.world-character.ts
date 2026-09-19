import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ysara = {
  id: "01a0b70d-e272-772d-8a50-8ef8aaf4ac6f",
  type: "page-type/world-character",
  slug: "ysara",
  title: "Ysara",
  world: "world/the-wandering-inn",
  firstChapter: 58,
  lastChapter: 642,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const zedalien = {
  id: "01a0b70d-e97c-7845-b421-8cb2e88dd66d",
  type: "page-type/world-character",
  slug: "zedalien",
  title: "Zedalien",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  firstChapter: 624,
  lastChapter: 791,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

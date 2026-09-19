import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const generalLael = {
  id: "01a0b70a-9586-7e23-b34f-e646ad9c89c8",
  type: "page-type/world-character",
  slug: "general-lael",
  title: "General Lael",
  world: "world/the-wandering-inn",
  firstChapter: 398,
  lastChapter: 492,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

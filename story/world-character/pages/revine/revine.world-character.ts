import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const revine = {
  id: "01a0b70c-934b-7ec7-ac43-8938a07a5842",
  type: "page-type/world-character",
  slug: "revine",
  title: "Revine",
  world: "world/the-wandering-inn",
  firstChapter: 326,
  lastChapter: 370,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

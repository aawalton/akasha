import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const merrik = {
  id: "01a0b70b-ea4e-760a-9827-96fee2814d6e",
  type: "page-type/world-character",
  slug: "merrik",
  title: "Merrik",
  world: "world/the-wandering-inn",
  firstChapter: 404,
  lastChapter: 560,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

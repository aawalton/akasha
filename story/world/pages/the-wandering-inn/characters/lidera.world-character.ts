import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lidera = {
  id: "01a0b70b-840e-783b-a9f5-f5c0b82ac290",
  type: "page-type/world-character",
  slug: "lidera",
  title: "Lidera",
  world: "world/the-wandering-inn",
  firstChapter: 685,
  lastChapter: 685,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

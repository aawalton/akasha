import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const igheriz = {
  id: "01a0b70b-06de-7c7d-bade-5a4f08a4bb7f",
  type: "page-type/world-character",
  slug: "igheriz",
  title: "Igheriz",
  world: "world/the-wandering-inn",
  firstChapter: 523,
  lastChapter: 523,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

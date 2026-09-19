import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const maise = {
  id: "01a0b70b-98aa-7543-9561-0da5a4b43348",
  type: "page-type/world-character",
  slug: "maise",
  title: "Maisé",
  world: "world/the-wandering-inn",
  firstChapter: 373,
  lastChapter: 373,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

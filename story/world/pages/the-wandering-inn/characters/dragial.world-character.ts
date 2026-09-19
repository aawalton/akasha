import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const dragial = {
  id: "01a0b70a-1c47-7aa4-8341-8b170fe5142a",
  type: "page-type/world-character",
  slug: "dragial",
  title: "Dragial",
  world: "world/the-wandering-inn",
  firstChapter: 494,
  lastChapter: 585,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

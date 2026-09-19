import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eloque = {
  id: "01a0b70a-66bd-7c09-9ea0-5fea40ce49aa",
  type: "page-type/world-character",
  slug: "eloque",
  title: "Eloque",
  world: "world/the-wandering-inn",
  firstChapter: 529,
  lastChapter: 552,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

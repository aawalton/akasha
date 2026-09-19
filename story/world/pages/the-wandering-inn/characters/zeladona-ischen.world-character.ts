import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const zeladonaIschen = {
  id: "01a0b70d-ea67-79a5-8918-73736146519e",
  type: "page-type/world-character",
  slug: "zeladona-ischen",
  title: "Zeladona Ischen",
  world: "world/the-wandering-inn",
  firstChapter: 752,
  lastChapter: 752,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

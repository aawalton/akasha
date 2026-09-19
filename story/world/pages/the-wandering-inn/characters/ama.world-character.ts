import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ama = {
  id: "01a0b707-6b02-727f-8fa0-ea8bf572d834",
  type: "page-type/world-character",
  slug: "ama",
  title: "Ama",
  world: "world/the-wandering-inn",
  firstChapter: 605,
  lastChapter: 713,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

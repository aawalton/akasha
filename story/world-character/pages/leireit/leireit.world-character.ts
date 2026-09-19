import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const leireit = {
  id: "01a0b70b-801b-778d-a6c9-3c45e626aeee",
  type: "page-type/world-character",
  slug: "leireit",
  title: "Leireit",
  world: "world/the-wandering-inn",
  firstChapter: 524,
  lastChapter: 524,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

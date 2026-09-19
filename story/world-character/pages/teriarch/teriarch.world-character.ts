import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const teriarch = {
  id: "01a0b70d-1823-72ca-aef3-d38095adf697",
  type: "page-type/world-character",
  slug: "teriarch",
  title: "Teriarch",
  world: "world/the-wandering-inn",
  firstChapter: 46,
  lastChapter: 824,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

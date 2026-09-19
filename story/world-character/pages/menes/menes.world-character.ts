import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const menes = {
  id: "01a0b70b-e629-733c-91f2-6aafaa87663c",
  type: "page-type/world-character",
  slug: "menes",
  title: "Menes",
  world: "world/the-wandering-inn",
  firstChapter: 50,
  lastChapter: 62,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

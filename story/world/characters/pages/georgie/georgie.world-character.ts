import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const georgie = {
  id: "01a0b70a-9ae8-7f24-b79b-189057cc0775",
  type: "page-type/world-character",
  slug: "georgie",
  title: "Georgie",
  world: "world/the-wandering-inn",
  firstChapter: 820,
  lastChapter: 821,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

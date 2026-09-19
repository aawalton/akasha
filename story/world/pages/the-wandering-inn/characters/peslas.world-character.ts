import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const peslas = {
  id: "01a0b70c-68a7-79f4-a4d4-0ec3886d6e31",
  type: "page-type/world-character",
  slug: "peslas",
  title: "Peslas",
  world: "world/the-wandering-inn",
  firstChapter: 78,
  lastChapter: 78,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

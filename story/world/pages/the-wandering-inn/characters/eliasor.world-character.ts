import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const eliasor = {
  id: "01a0b70a-289c-7c9d-9853-7e5640cae7f9",
  type: "page-type/world-character",
  slug: "eliasor",
  title: "Eliasor",
  world: "world/the-wandering-inn",
  firstChapter: 183,
  lastChapter: 183,
  characterClaims: "jsonl",
  aliasOf: "world-character/eliasor-melissar",
} as const satisfies WorldCharacter

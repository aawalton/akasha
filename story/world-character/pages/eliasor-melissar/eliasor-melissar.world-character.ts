import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eliasorMelissar = {
  id: "01a0b70a-64f4-7f3e-8b76-7fa65191d69c",
  type: "page-type/world-character",
  slug: "eliasor-melissar",
  title: "Eliasor Melissar",
  world: "world/the-wandering-inn",
  firstChapter: 338,
  lastChapter: 338,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

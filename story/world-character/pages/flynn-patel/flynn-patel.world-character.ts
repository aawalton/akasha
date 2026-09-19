import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const flynnPatel = {
  id: "01a0b70a-8b22-7b9e-bc5f-42f72e89712f",
  type: "page-type/world-character",
  slug: "flynn-patel",
  title: "Flynn Patel",
  world: "world/the-wandering-inn",
  firstChapter: 453,
  lastChapter: 496,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

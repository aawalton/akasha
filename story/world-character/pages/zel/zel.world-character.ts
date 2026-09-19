import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zel = {
  id: "01a0b70d-e9b8-748b-9183-76f5a49c4999",
  type: "page-type/world-character",
  slug: "zel",
  title: "Zel",
  world: "world/the-wandering-inn",
  firstChapter: 191,
  lastChapter: 257,
  characterClaims: "jsonl",
  aliasOf: "world-character/zel-shivertail",
} as const satisfies WorldCharacter

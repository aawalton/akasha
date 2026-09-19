import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const luan = {
  id: "01a0b70b-8d99-76e6-8535-67b1ab7148bb",
  type: "page-type/world-character",
  slug: "luan",
  title: "Luan",
  world: "world/the-wandering-inn",
  firstChapter: 196,
  lastChapter: 695,
  characterClaims: "jsonl",
  aliasOf: "world-character/luan-khumalo",
} as const satisfies WorldCharacter

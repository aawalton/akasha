import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const soliciaVeldant = {
  id: "01a0b70d-0873-7f86-b977-b1bff3b0b647",
  type: "page-type/world-character",
  slug: "solicia-veldant",
  title: "Solicia",
  world: "world/the-wandering-inn",
  firstChapter: 366,
  lastChapter: 366,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

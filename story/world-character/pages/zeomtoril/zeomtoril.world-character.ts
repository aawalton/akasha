import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zeomtoril = {
  id: "01a0b70d-ec06-7857-8d87-3355d24b50e1",
  type: "page-type/world-character",
  slug: "zeomtoril",
  title: "Zeomtoril",
  world: "world/the-wandering-inn",
  firstChapter: 823,
  lastChapter: 823,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

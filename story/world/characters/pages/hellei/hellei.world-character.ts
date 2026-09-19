import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const hellei = {
  id: "01a0b70a-f879-7c74-a24b-81aa72a14e8d",
  type: "page-type/world-character",
  slug: "hellei",
  title: "Hellei",
  world: "world/the-wandering-inn",
  firstChapter: 608,
  lastChapter: 608,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

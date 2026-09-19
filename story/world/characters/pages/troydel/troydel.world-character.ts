import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const troydel = {
  id: "01a0b70d-7354-733f-9556-de317855a5e6",
  type: "page-type/world-character",
  slug: "troydel",
  title: "Troydel",
  world: "world/the-wandering-inn",
  firstChapter: 644,
  lastChapter: 783,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

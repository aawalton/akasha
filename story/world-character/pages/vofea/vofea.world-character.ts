import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const vofea = {
  id: "01a0b70d-961b-7411-81bf-6b2ae1af676e",
  type: "page-type/world-character",
  slug: "vofea",
  title: "Vofea",
  world: "world/the-wandering-inn",
  firstChapter: 683,
  lastChapter: 795,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const xif = {
  id: "01a0b70d-a3ff-71cc-8eea-b2776a500560",
  type: "page-type/world-character",
  slug: "xif",
  title: "Xif",
  world: "world/the-wandering-inn",
  firstChapter: 352,
  lastChapter: 793,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

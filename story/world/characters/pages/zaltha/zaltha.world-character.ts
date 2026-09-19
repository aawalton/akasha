import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const zaltha = {
  id: "01a0b70d-e75c-7025-ae7a-0f82eaa0561c",
  type: "page-type/world-character",
  slug: "zaltha",
  title: "Zaltha",
  world: "world/the-wandering-inn",
  firstChapter: 706,
  lastChapter: 707,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

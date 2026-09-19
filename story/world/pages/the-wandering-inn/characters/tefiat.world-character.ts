import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tefiat = {
  id: "01a0b70d-13ea-7fa8-b88f-e50ddb814251",
  type: "page-type/world-character",
  slug: "tefiat",
  title: "Tefiat",
  world: "world/the-wandering-inn",
  firstChapter: 199,
  lastChapter: 199,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const khelta = {
  id: "01a0b70b-6982-76e8-861c-e0822362b23f",
  type: "page-type/world-character",
  slug: "khelta",
  title: "Khelta",
  world: "world/the-wandering-inn",
  firstChapter: 577,
  lastChapter: 589,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

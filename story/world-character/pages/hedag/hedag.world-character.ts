import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hedag = {
  id: "01a0b70a-f6b7-7fa7-a2ec-3e9ce71f4941",
  type: "page-type/world-character",
  slug: "hedag",
  title: "Hedag",
  world: "world/the-wandering-inn",
  firstChapter: 351,
  lastChapter: 611,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const workers = {
  id: "01a0b70d-a0d9-7c60-b29a-36c2be666069",
  type: "page-type/world-character",
  slug: "workers",
  title: "Workers",
  world: "world/the-wandering-inn",
  firstChapter: 32,
  lastChapter: 32,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tengrip = {
  id: "01a0b70d-1561-7e89-8f1a-14f3644a13d0",
  type: "page-type/world-character",
  slug: "tengrip",
  title: "Tengrip",
  world: "world/the-wandering-inn",
  firstChapter: 182,
  lastChapter: 182,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

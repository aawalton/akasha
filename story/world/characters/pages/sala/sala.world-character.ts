import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sala = {
  id: "01a0b70c-a874-784c-9b45-bfb7aff2f346",
  type: "page-type/world-character",
  slug: "sala",
  title: "Sa'la",
  world: "world/the-wandering-inn",
  firstChapter: 771,
  lastChapter: 771,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const buleth = {
  id: "01a0b707-8b34-7ccd-ac91-d2da2cb32312",
  type: "page-type/world-character",
  slug: "buleth",
  title: "Buleth",
  world: "world/the-wandering-inn",
  firstChapter: 58,
  lastChapter: 58,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter

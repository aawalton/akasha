import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ladyXersia = {
  id: "01a0b70b-7634-7f7a-8b03-4d66e000e18c",
  type: "page-type/world-character",
  slug: "lady-xersia",
  title: "Lady Xersia",
  world: "world/the-wandering-inn",
  firstChapter: 217,
  lastChapter: 217,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
